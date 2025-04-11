"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApartmentsUseCase = void 0;
class GetApartmentsUseCase {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async execute(filters) {
        return this.apartmentRepository.findAll(filters);
    }
}
exports.GetApartmentsUseCase = GetApartmentsUseCase;
