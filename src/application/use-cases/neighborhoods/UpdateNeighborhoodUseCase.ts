import {
    PostgresNeighborhoodRepository
} from "../../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";

class UpdateNeighborhoodUseCase {
    constructor( private neighborhoodRepository: PostgresNeighborhoodRepository ) {
    }

    async execute( id: number, neighborhood: any ) {
        return this.neighborhoodRepository.update(id, neighborhood)
    }
}
export { UpdateNeighborhoodUseCase }