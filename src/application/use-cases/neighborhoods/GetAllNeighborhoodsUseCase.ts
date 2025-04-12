import {
    PostgresNeighborhoodRepository
} from "../../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";

class GetAllNeighborhoodsUseCase {
    constructor( private neighborhoodRepository: PostgresNeighborhoodRepository ) {
    }

    async execute( cityId?: number ) {
        return this.neighborhoodRepository.findAll(cityId)
    }
}
export { GetAllNeighborhoodsUseCase }