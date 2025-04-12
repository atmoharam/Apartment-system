import {BenefitRepository} from "../../../domain/repositories/BenefitRepository";
import {Benefit} from "../../../domain/entities/Benefit";

class GetAllBenefitsUseCase {
    constructor( private benefitRepository: BenefitRepository ) {
    }

    async execute(): Promise<Benefit[]> {
        return await this.benefitRepository.findAll();
    }
}
export default GetAllBenefitsUseCase;