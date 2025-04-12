import {PostgresCityRepository} from "../../../frameworks/database/postgres/repositories/PostgresCityRepository";
import type {City} from "../../../domain/entities/City";


class FindCityByIdUseCase {
    constructor( private cityRepository: PostgresCityRepository ) {
    }

    async execute( id: number ): Promise<City | null> {
        return await this.cityRepository.findById(id);
    }
}
export default FindCityByIdUseCase;