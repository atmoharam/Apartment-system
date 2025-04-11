import type { Apartment } from "../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"

export class CreateApartmentUseCase {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async execute(apartmentData: Apartment): Promise<Apartment> {
    return this.apartmentRepository.create(apartmentData)
  }
}
