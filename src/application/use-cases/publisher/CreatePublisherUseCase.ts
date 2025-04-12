import {PublisherRepository} from "../../../domain/repositories/PublisherRepository";
import {Publisher} from "../../../domain/entities/Publisher";

class CreatePublisherUseCase {
    constructor( private publisherRepository: PublisherRepository ) {
    }

    async execute( publisherData: Omit<Publisher, "id" | "createdAt"> ): Promise<Publisher> {
        const existingPublisher = await this.publisherRepository.findByEmail(publisherData.email)
        if (existingPublisher) {
            throw new Error("Email already in use")
        }
        return this.publisherRepository.create(publisherData)
    }
}
export {CreatePublisherUseCase}