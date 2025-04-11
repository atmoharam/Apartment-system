import type { Apartment } from "../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"

export class GetApartmentsUseCase {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async execute(filters?: Partial<Apartment>): Promise<Apartment[]> {
    return this.apartmentRepository.findAll(filters)
  }
}
