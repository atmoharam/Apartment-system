"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApartmentByIdUseCase = void 0;
class GetApartmentByIdUseCase {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async execute(id) {
        return this.apartmentRepository.findById(id);
    }
}
exports.GetApartmentByIdUseCase = GetApartmentByIdUseCase;
