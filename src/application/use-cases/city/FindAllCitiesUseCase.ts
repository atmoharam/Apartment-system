import {PostgresCityRepository} from "../../../frameworks/database/postgres/repositories/PostgresCityRepository";
import type {City} from "../../../domain/entities/City";

class FindAllCitiesUseCase {
    constructor( private cityRepository: PostgresCityRepository ) {
    }

    async execute(): Promise<City[]> {
        return await this.cityRepository.findAll();
    }
}
export default FindAllCitiesUseCase;