import {
    PostgresNeighborhoodRepository
} from "../../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";


class DeleteNeighborhoodUseCase {
    constructor( private neighborhoodRepository: PostgresNeighborhoodRepository ) {
    }

    async execute( id: number ) {
        return this.neighborhoodRepository.delete(id)
    }
}
export { DeleteNeighborhoodUseCase }