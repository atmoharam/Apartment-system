import type { Apartment } from "../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"

export class UpdateApartmentUseCase {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async execute(id: number, apartmentData: Partial<Apartment>): Promise<Apartment | null> {
    return this.apartmentRepository.update(id, apartmentData)
  }
}
