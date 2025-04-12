import type { Apartment } from "../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../domain/repositories/ApartmentRepository"
import {Publisher} from "../../../domain/entities/Publisher";
import {PublisherRepository} from "../../../domain/repositories/PublisherRepository";

export class CreateApartmentUseCase {
  constructor(private apartmentRepository: ApartmentRepository,
              private publisherRepository: PublisherRepository
  ) {}

  async execute(apartmentData: Apartment, publisher: Publisher): Promise<Apartment> {
    const saved = await this.publisherRepository.create(publisher);
    apartmentData.publisherId =await saved.id;
    return this.apartmentRepository.create(apartmentData)
  }
}
