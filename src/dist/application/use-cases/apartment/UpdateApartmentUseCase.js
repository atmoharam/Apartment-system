"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApartmentUseCase = void 0;
class UpdateApartmentUseCase {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async execute(id, apartmentData) {
        return this.apartmentRepository.update(id, apartmentData);
    }
}
exports.UpdateApartmentUseCase = UpdateApartmentUseCase;
