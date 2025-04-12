import {PublisherRepository} from "../../../domain/repositories/PublisherRepository";
import {Publisher} from "../../../domain/entities/Publisher";

class UpdatePublisherUseCase {
    constructor( private publisherRepository: PublisherRepository ) {
    }

    async execute( id: number ): Promise<Publisher | null> {
        return this.publisherRepository.findById(id)
    }
}
export {UpdatePublisherUseCase}