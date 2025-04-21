import {
    PostgresNeighborhoodRepository
} from "../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository";
import type {Request, Response} from "express";
import {GetAllNeighborhoodsUseCase} from "../../application/use-cases/neighborhoods/GetAllNeighborhoodsUseCase";
import {GetNeighborhoodByIdUseCase} from "../../application/use-cases/neighborhoods/GetNeighborhoodByIdUseCase";
import {CreateNeighborhoodUseCase} from "../../application/use-cases/neighborhoods/CreateNeighborhoodUseCase";
import {UpdateNeighborhoodUseCase} from "../../application/use-cases/neighborhoods/UpdateNeighborhoodUseCase";
import {DeleteNeighborhoodUseCase} from "../../application/use-cases/neighborhoods/DeleteNeighborhoodUseCase";

export class NeighborhoodController {
    private getAllNeighborhoodsUseCase: GetAllNeighborhoodsUseCase;
    private getNeighborhoodByIdUseCase: GetNeighborhoodByIdUseCase;
    private createNeighborhoodUseCase: CreateNeighborhoodUseCase;
    private updateNeighborhoodUseCase: UpdateNeighborhoodUseCase;
    private deleteNeighborhoodUseCase: DeleteNeighborhoodUseCase;

    constructor( neighborhoodRepository: PostgresNeighborhoodRepository ) {
        this.getAllNeighborhoodsUseCase = new GetAllNeighborhoodsUseCase(neighborhoodRepository);
        this.getNeighborhoodByIdUseCase = new GetNeighborhoodByIdUseCase(neighborhoodRepository);
        this.createNeighborhoodUseCase = new CreateNeighborhoodUseCase(neighborhoodRepository);
        this.updateNeighborhoodUseCase = new UpdateNeighborhoodUseCase(neighborhoodRepository);
        this.deleteNeighborhoodUseCase = new DeleteNeighborhoodUseCase(neighborhoodRepository);
    }

    async getAllNeighborhoods( req: Request, res: Response ): Promise<void> {
        try {
            const cityId = req.query.cityId ? Number(req.query.cityId) : undefined;
            const neighborhoods = await this.getAllNeighborhoodsUseCase.execute(cityId);
            res.status(200).json(neighborhoods);
        } catch (error) {
            console.error("Error getting neighborhoods:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async getNeighborhoodById( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid neighborhood ID"});
                return;
            }

            const neighborhood = await this.getNeighborhoodByIdUseCase.execute(id);

            if (!neighborhood) {
                res.status(404).json({message: "Neighborhood not found"});
                return;
            }

            res.status(200).json(neighborhood);
        } catch (error) {
            console.error("Error getting neighborhood by ID:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async createNeighborhood( req: Request, res: Response ): Promise<void> {
        try {
            const neighborhood = await this.createNeighborhoodUseCase.execute(req.body);
            res.status(201).json(neighborhood);
        } catch (error) {
            console.error("Error creating neighborhood:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async updateNeighborhood( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid neighborhood ID"});
                return;
            }

            const neighborhood = await this.updateNeighborhoodUseCase.execute(id, req.body);

            if (!neighborhood) {
                res.status(404).json({message: "Neighborhood not found"});
                return;
            }

            res.status(200).json(neighborhood);
        } catch (error) {
            console.error("Error updating neighborhood:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async deleteNeighborhood( req: Request, res: Response ): Promise<void> {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid neighborhood ID"});
                return;
            }

            const success = await this.deleteNeighborhoodUseCase.execute(id);

            if (!success) {
                res.status(404).json({message: "Neighborhood not found"});
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error("Error deleting neighborhood:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}