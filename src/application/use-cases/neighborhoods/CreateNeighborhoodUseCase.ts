import {
    PostgresNeighborhoodRepository
} from "../../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";


class CreateNeighborhoodUseCase {
    constructor( private neighborhoodRepository: PostgresNeighborhoodRepository ) {
    }

    async execute( neighborhood: any ) {
        return this.neighborhoodRepository.create(neighborhood)
    }
}
export { CreateNeighborhoodUseCase }