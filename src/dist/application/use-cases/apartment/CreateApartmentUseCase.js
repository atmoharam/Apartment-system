"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApartmentUseCase = void 0;
class CreateApartmentUseCase {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async execute(apartmentData) {
        return this.apartmentRepository.create(apartmentData);
    }
}
exports.CreateApartmentUseCase = CreateApartmentUseCase;
