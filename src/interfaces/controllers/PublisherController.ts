import type {Request, Response} from "express"
import type {PublisherRepository} from "../../domain/repositories/PublisherRepository"
import type {Publisher} from "../../domain/entities/Publisher"
import {GetAllPublishersUseCase} from "../../application/use-cases/publisher/GetAllPublishersUseCase";
import {GetPublisherByIdUseCase} from "../../application/use-cases/publisher/GetPublisherByIdUseCase";
import {CreatePublisherUseCase} from "../../application/use-cases/publisher/CreatePublisherUseCase";
import {UpdatePublisherUseCase} from "../../application/use-cases/publisher/UpdatePublisherUseCase";



export class PublisherController {
    private getAllPublishersUseCase: GetAllPublishersUseCase
    private getPublisherByIdUseCase: GetPublisherByIdUseCase
    private createPublisherUseCase: CreatePublisherUseCase
    private updatePublisherUseCase: UpdatePublisherUseCase

    constructor( publisherRepository: PublisherRepository ) {
        this.getAllPublishersUseCase = new GetAllPublishersUseCase(publisherRepository)
        this.getPublisherByIdUseCase = new GetPublisherByIdUseCase(publisherRepository)
        this.createPublisherUseCase = new CreatePublisherUseCase(publisherRepository)
        this.updatePublisherUseCase = new UpdatePublisherUseCase(publisherRepository)
    }

    async getAllPublishers( req: Request, res: Response ): Promise<void> {
        try {
            const publishers = await this.getAllPublishersUseCase.execute()
            res.status(200).json(publishers)
        } catch (error) {
            console.error("Error getting publishers:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async getPublisherById( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id)

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid publisher ID"})
                return
            }

            const publisher = await this.getPublisherByIdUseCase.execute(id)

            if (!publisher) {
                res.status(404).json({message: "Publisher not found"})
                return
            }

            res.status(200).json(publisher)
        } catch (error) {
            console.error("Error getting publisher by ID:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async createPublisher( req: Request, res: Response ): Promise<void> {
        try {
            const publisherData = req.body as Omit<Publisher, "passwordHash"> & { password: string }

            if (!publisherData.name || !publisherData.email || !publisherData.password) {
                res.status(400).json({message: "Name, email, and password are required"})
                return
            }

            try {
                const publisher = await this.createPublisherUseCase.execute({
                    name: publisherData.name,
                    email: publisherData.email,
                    phoneNumber: publisherData.phoneNumber,
                })
                res.status(201).json(publisher)
            } catch (error) {
                if (error instanceof Error && error.message === "Email already in use") {
                    res.status(409).json({message: error.message})
                    return
                }
                throw error
            }

        } catch (error) {
            console.error("Error creating publisher:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    async updatePublisher( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id)

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid publisher ID"})
                return
            }

            const existingPublisher = await this.updatePublisherUseCase.execute(id)

            if (!existingPublisher) {
                res.status(404).json({message: "Publisher not found"})
                return
            }
            res.status(200).json(existingPublisher)
        } catch (error) {
            console.error("Error updating publisher:", error)
            res.status(500).json({message: "Internal server error"})
        }
    }
}

export {PublisherController as publisherController}