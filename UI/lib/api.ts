import type { Apartment, Benefit, City, CreateApartmentRequest, Neighborhood } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Helper function for API requests
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

// Get all apartments with optional filters
export async function getAllApartments(filters?: Record<string, any>): Promise<Apartment[]> {
  let url = "/apartments"

  if (filters) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })

    if (params.toString()) {
      url += `?${params.toString()}`
    }
  }

  const apartments = await fetchAPI<Apartment[]>(url)

  // Fetch additional data for each apartment
  const enhancedApartments = await Promise.all(
      apartments.map(async (apartment) => {
        try {
          // Get city name
          if (apartment.cityId) {
            const city = await getCityById(apartment.cityId)
            apartment.cityName = city.name
          }

          // Get neighborhood name
          if (apartment.neighborhoodId) {
            const neighborhood = await getNeighborhoodById(apartment.neighborhoodId)
            apartment.neighborhoodName = neighborhood.name
          }

          // Get benefit names
          if (apartment.benefits && apartment.benefits.length > 0) {
            const benefitNames = await Promise.all(
                apartment.benefits.map(async (benefitId) => {
                  const benefit = await getBenefitById(benefitId)
                  return benefit.name
                }),
            )
            apartment.benefitNames = benefitNames
          }

          return apartment
        } catch (error) {
          console.error(`Error enhancing apartment ${apartment.id}:`, error)
          return apartment
        }
      }),
  )

  return enhancedApartments
}

// Get apartment by ID
export async function getApartmentById(id: number): Promise<Apartment | null> {
  try {
    const apartment = await fetchAPI<Apartment>(`/apartments/${id}`)

    // Get city name
    if (apartment.cityId) {
      const city = await getCityById(apartment.cityId)
      apartment.cityName = city.name
    }

    // Get neighborhood name
    if (apartment.neighborhoodId) {
      const neighborhood = await getNeighborhoodById(apartment.neighborhoodId)
      apartment.neighborhoodName = neighborhood.name
    }

    // Get benefit names
    if (apartment.benefits && apartment.benefits.length > 0) {
      const benefitNames = await Promise.all(
          apartment.benefits.map(async (benefitId) => {
            const benefit = await getBenefitById(benefitId)
            return benefit.name
          }),
      )
      apartment.benefitNames = benefitNames
    }

    return apartment
  } catch (error) {
    console.error(`Error fetching apartment ${id}:`, error)
    return null
  }
}

// Create new apartment
export async function createApartment(data: CreateApartmentRequest): Promise<Apartment> {
  // If the backend still requires a password, we can set a default one
  const requestData = {
    ...data
  }

  return fetchAPI<Apartment>("/apartments", {
    method: "POST",
    body: JSON.stringify(requestData),
  })
}

// Get all cities
export async function getAllCities(): Promise<City[]> {
  return fetchAPI<City[]>("/cities")
}

// Get city by ID
export async function getCityById(id: number): Promise<City> {
  return fetchAPI<City>(`/cities/${id}`)
}

// Get all neighborhoods
export async function getAllNeighborhoods(): Promise<Neighborhood[]> {
  return fetchAPI<Neighborhood[]>("/neighborhoods")
}

// Get neighborhoods by city
export async function getNeighborhoodsByCity(cityId: number): Promise<Neighborhood[]> {
  return fetchAPI<Neighborhood[]>(`/neighborhoods?cityId=${cityId}`)
}

// Get neighborhood by ID
export async function getNeighborhoodById(id: number): Promise<Neighborhood> {
  return fetchAPI<Neighborhood>(`/neighborhoods/${id}`)
}

// Get all benefits
export async function getAllBenefits(): Promise<Benefit[]> {
  return fetchAPI<Benefit[]>("/benefits")
}

// Get benefit by ID
export async function getBenefitById(id: number): Promise<Benefit> {
  return fetchAPI<Benefit>(`/benefits/${id}`)
}

// Get similar properties
export async function getSimilarProperties(apartmentId: number): Promise<Apartment[]> {
  try {
    const apartment = await getApartmentById(apartmentId)

    if (!apartment) {
      return []
    }

    // Get apartments with similar characteristics
    const filters: Record<string, any> = {
      cityId: apartment.cityId,
    }

    if (apartment.status) {
      filters.status = apartment.status
    }

    const apartments = await getAllApartments(filters)

    // Filter out the current apartment and limit to 2
    return apartments.filter((apt) => apt.id !== apartmentId).slice(0, 2)
  } catch (error) {
    console.error("Error fetching similar properties:", error)
    return []
  }
}
