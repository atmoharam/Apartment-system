import {PostgresCityRepository} from "../../frameworks/database/postgres/repositories/PostgresCityRepository";
import type {Request, Response} from "express";
import type {City} from "../../domain/entities/City";
import FindAllCitiesUseCase from "../../application/use-cases/city/FindAllCitiesUseCase";
import FindCityByIdUseCase from "../../application/use-cases/city/FindCityByIdUseCase";

class CityController {
    private findAllCitiesUseCase: FindAllCitiesUseCase;
    private findCityByIdUseCase: FindCityByIdUseCase;

    constructor( cityRepository: PostgresCityRepository ) {
        this.findAllCitiesUseCase = new FindAllCitiesUseCase(cityRepository);
        this.findCityByIdUseCase = new FindCityByIdUseCase(cityRepository);
    }

    async getAllCities( req: Request, res: Response ) {
        try {
            const cities = await this.findAllCitiesUseCase.execute()
            res.status(200).json(cities)
        } catch (error) {
            console.error("Error getting cities:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async getCityById( req: Request, res: Response ) {
        try {
            const id = Number(req.params.id)

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid city ID"})
                return
            }

            const city = await this.findCityByIdUseCase.execute(id)

            if (!city) {
                res.status(404).json({message: "City not found"})
                return
            }

            res.status(200).json(city)
        } catch (error) {
            console.error("Error getting city by ID:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }
}

export default CityController