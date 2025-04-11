import type { Apartment } from "../entities/Apartment"

export interface ApartmentRepository {
  findAll(filters?: Partial<Apartment>): Promise<Apartment[]>
  findById(id: number): Promise<Apartment | null>
  create(apartment: Apartment): Promise<Apartment>
  update(id: number, apartment: Partial<Apartment>): Promise<Apartment | null>
  delete(id: number): Promise<boolean>
  addBenefit(apartmentId: number, benefitId: number): Promise<boolean>
  removeBenefit(apartmentId: number, benefitId: number): Promise<boolean>
  getBenefits(apartmentId: number): Promise<number[]>
}
