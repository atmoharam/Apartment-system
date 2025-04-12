import {PublisherRepository} from "../../../domain/repositories/PublisherRepository";
import {Publisher} from "../../../domain/entities/Publisher";

class GetAllPublishersUseCase {
    constructor( private publisherRepository: PublisherRepository ) {
    }

    async execute(): Promise<Publisher[]> {
        return this.publisherRepository.findAll()
    }
}
export {GetAllPublishersUseCase}