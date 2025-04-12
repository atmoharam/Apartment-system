import {BenefitRepository} from "../../../domain/repositories/BenefitRepository";
import {Benefit} from "../../../domain/entities/Benefit";

class GetBenefitByIdUseCase {
    constructor( private benefitRepository: BenefitRepository ) {
    }

    async execute( id: number ): Promise<Benefit | null> {
        return await this.benefitRepository.findById(id);
    }
}
export default GetBenefitByIdUseCase;