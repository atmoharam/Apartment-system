import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"

export class DeleteApartmentUseCase {
  constructor(private apartmentRepository: ApartmentRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.apartmentRepository.delete(id)
  }
}
