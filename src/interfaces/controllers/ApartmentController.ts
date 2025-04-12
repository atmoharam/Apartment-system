import type {Request, Response} from "express"
import type {Apartment} from "../../domain/entities/Apartment"
import {ApartmentStatus, ApartmentType} from "../../domain/entities/Apartment"
import {GetApartmentsUseCase} from "../../application/use-cases/apartment/GetApartmentsUseCase";
import {GetApartmentByIdUseCase} from "../../application/use-cases/apartment/GetApartmentByIdUseCase";
import {CreateApartmentUseCase} from "../../application/use-cases/apartment/CreateApartmentUseCase";
import {ApartmentRepository} from "../../domain/repositories/ApartmentRepository";
import {PublisherRepository} from "../../domain/repositories/PublisherRepository";

export class ApartmentController {
    private getApartmentsUseCase: GetApartmentsUseCase
    private getApartmentByIdUseCase: GetApartmentByIdUseCase
    private createApartmentUseCase: CreateApartmentUseCase

    constructor(
        apartmentRepository: ApartmentRepository,
        publisherRepository: PublisherRepository
    ) {
        this.getApartmentsUseCase = new GetApartmentsUseCase(apartmentRepository)
        this.getApartmentByIdUseCase = new GetApartmentByIdUseCase(apartmentRepository)
        this.createApartmentUseCase = new CreateApartmentUseCase(apartmentRepository, publisherRepository)
    }

    private buildFilters( query: any ): Partial<Apartment> {
        const filters: any = {}

        if (query.cityId) filters.cityId = Number(query.cityId)
        if (query.neighborhoodId) filters.neighborhoodId = Number(query.neighborhoodId)
        if (query.status && Object.values(ApartmentStatus).includes(query.status)) {
            filters.status = query.status as ApartmentStatus
        }
        if (query.type && Object.values(ApartmentType).includes(query.type)) {
            filters.type = query.type as ApartmentType
        }
        if (query.name) filters.name = query.name
        if (query.ownerCompany) filters.ownerCompany = query.ownerCompany
        if (query.minPrice) filters.minPrice = Number(query.minPrice)
        if (query.maxPrice) filters.maxPrice = Number(query.maxPrice)
        if (query.benefitIds) {
            filters.benefitIds = Array.isArray(query.benefitIds)
                ? query.benefitIds.map(Number)
                : [Number(query.benefitIds)]
        }

        return filters
    }

    private validateApartmentData( apartmentData: Apartment, publisherData: any ): boolean {
        return !!(
            apartmentData.name &&
            apartmentData.ownerCompany &&
            apartmentData.status &&
            apartmentData.type &&
            apartmentData.price &&
            apartmentData.cityId &&
            publisherData.name &&
            publisherData.email
        )
    }

    private handleError( error: unknown, res: Response, message: string ): void {
        console.error(message, error)
        res.status(500).json({message: "Internal server error"})
    }

    async getAllApartments( req: Request, res: Response ): Promise<void> {
        try {
            const filters = this.buildFilters(req.query)
            const apartments = await this.getApartmentsUseCase.execute(filters)
            res.status(200).json(apartments)
        } catch (error) {
            this.handleError(error, res, "Error getting apartments:")
        }
    }

    async getApartmentById( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                res.status(400).json({message: "Invalid apartment ID"})
                return
            }

            const apartment = await this.getApartmentByIdUseCase.execute(id)
            if (!apartment) {
                res.status(404).json({message: "Apartment not found"})
                return
            }

            res.status(200).json(apartment)
        } catch (error) {
            this.handleError(error, res, "Error getting apartment by ID:")
        }
    }

    async createApartment( req: Request, res: Response ): Promise<void> {
        try {
            const {apartment: apartmentData, publisher: publisherData} = req.body

            if (!this.validateApartmentData(apartmentData, publisherData)) {
                res.status(400).json({message: "Missing required fields"})
                return
            }

            const apartment = await this.createApartmentUseCase.execute(
                apartmentData,
                publisherData
            )
            res.status(201).json(apartment)
        } catch (error) {
            this.handleError(error, res, "Error creating apartment:")
        }
    }
}
export default ApartmentController