export interface Apartment {
  id: number
  name: string
  ownerCompany: string
  status: "rent" | "sale"
  type: "apartment" | "villa" | "chalet"
  price: number
  roomsCount: number
  bathroomsCount: number
  size: number
  photoUrls: string[]
  streetName?: string
  buildingNumber?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  headerDescription?: string
  description?: string
  publisherId?: number
  cityId: number
  neighborhoodId?: number
  createdAt?: string
  benefits?: number[]

  // Additional fields from joins
  cityName?: string
  neighborhoodName?: string
  benefitNames?: string[]
}

export interface City {
  id: number
  name: string
}

export interface Neighborhood {
  id: number
  name: string
  cityId: number
}

export interface Benefit {
  id: number
  name: string
}

export interface Publisher {
  id: number
  name: string
  email: string
  phoneNumber?: string
  createdAt?: string
}

export interface CreateApartmentRequest {
  apartment: Omit<Apartment, "id" | "createdAt" | "cityName" | "neighborhoodName" | "benefitNames">
  publisher: {
    name: string
    email: string
    phoneNumber?: string
  }
}
