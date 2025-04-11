"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteApartmentUseCase = void 0;
class DeleteApartmentUseCase {
    constructor(apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }
    async execute(id) {
        return this.apartmentRepository.delete(id);
    }
}
exports.DeleteApartmentUseCase = DeleteApartmentUseCase;
