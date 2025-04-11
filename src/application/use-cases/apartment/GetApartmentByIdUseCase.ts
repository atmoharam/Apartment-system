import type { Apartment } from "../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"

export class GetApartmentByIdUseCase {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async execute(id: number): Promise<Apartment | null> {
    return this.apartmentRepository.findById(id)
  }
}
