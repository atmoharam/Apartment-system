import {BenefitRepository} from "../../domain/repositories/BenefitRepository";
import type {Request, Response} from "express";
import GetAllBenefitsUseCase from "../../application/use-cases/benefits/GetAllBenefitsUseCase";
import GetBenefitByIdUseCase from "../../application/use-cases/benefits/GetBenefitByIdUseCase";

class BenefitController {
    private getAllBenefitsUseCase: GetAllBenefitsUseCase;
    private getBenefitByIdUseCase: GetBenefitByIdUseCase;

    constructor( benefitRepository: BenefitRepository ) {
        this.getAllBenefitsUseCase = new GetAllBenefitsUseCase(benefitRepository);
        this.getBenefitByIdUseCase = new GetBenefitByIdUseCase(benefitRepository);
    }

    async getAllBenefits( req: Request, res: Response ) {
        try {
            const benefits = await this.getAllBenefitsUseCase.execute();
            res.status(200).json(benefits);
        } catch (error) {
            console.error("Error getting benefits:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }

    async getBenefitById( req: Request, res: Response ) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({message: "Invalid benefit ID"});
                return;
            }

            const benefit = await this.getBenefitByIdUseCase.execute(id);

            if (!benefit) {
                res.status(404).json({message: "Benefit not found"});
                return;
            }

            res.status(200).json(benefit);
        } catch (error) {
            console.error("Error getting benefit by ID:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

export default BenefitController;