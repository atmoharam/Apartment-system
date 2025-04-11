export enum ApartmentStatus {
  RENT = "rent",
  SALE = "sale",
}

export enum ApartmentType {
  VILLA = "villa",
  CHALET = "chalet",
  APARTMENT = "apartment",
}

export interface Apartment {
  id?: number
  name: string
  ownerCompany: string
  status: ApartmentStatus
  type: ApartmentType
  price: number // Added price field
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
  createdAt?: Date
  benefits?: number[]
}
