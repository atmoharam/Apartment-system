import {
    PostgresNeighborhoodRepository
} from "../../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";


class GetNeighborhoodByIdUseCase {
    constructor( private neighborhoodRepository: PostgresNeighborhoodRepository ) {
    }

    async execute( id: number ) {
        return this.neighborhoodRepository.findById(id)
    }
}
export { GetNeighborhoodByIdUseCase }