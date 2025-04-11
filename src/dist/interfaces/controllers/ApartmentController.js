"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentController = void 0;
const PostgresApartmentRepository_1 = require("../../frameworks/database/postgres/repositories/PostgresApartmentRepository");
const PostgresPublisherRepository_1 = require("../../frameworks/database/postgres/repositories/PostgresPublisherRepository");
const Apartment_1 = require("../../domain/entities/Apartment");
class ApartmentController {
    constructor() {
        this.apartmentRepository = new PostgresApartmentRepository_1.PostgresApartmentRepository();
        this.publisherRepository = new PostgresPublisherRepository_1.PostgresPublisherRepository();
    }
    async getAllApartments(req, res) {
        try {
            const filters = {};
            // Basic filters
            if (req.query.cityId) {
                filters.cityId = Number(req.query.cityId);
            }
            if (req.query.neighborhoodId) {
                filters.neighborhoodId = Number(req.query.neighborhoodId);
            }
            if (req.query.status && Object.values(Apartment_1.ApartmentStatus).includes(req.query.status)) {
                filters.status = req.query.status;
            }
            if (req.query.type && Object.values(Apartment_1.ApartmentType).includes(req.query.type)) {
                filters.type = req.query.type;
            }
            // Additional filters
            if (req.query.name) {
                filters.name = req.query.name;
            }
            if (req.query.ownerCompany) {
                filters.ownerCompany = req.query.ownerCompany;
            }
            if (req.query.minPrice) {
                filters.minPrice = Number(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                filters.maxPrice = Number(req.query.maxPrice);
            }
            // Benefits filter
            if (req.query.benefitIds) {
                const benefitIds = Array.isArray(req.query.benefitIds)
                    ? req.query.benefitIds.map(Number)
                    : [Number(req.query.benefitIds)];
                filters.benefitIds = benefitIds;
            }
            const apartments = await this.apartmentRepository.findAll(filters);
            res.status(200).json(apartments);
        }
        catch (error) {
            console.error("Error getting apartments:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getApartmentById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid apartment ID" });
                return;
            }
            const apartment = await this.apartmentRepository.findById(id);
            if (!apartment) {
                res.status(404).json({ message: "Apartment not found" });
                return;
            }
            res.status(200).json(apartment);
        }
        catch (error) {
            console.error("Error getting apartment by ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async createApartment(req, res) {
        try {
            const apartmentData = req.body.apartment;
            const publisherData = req.body.publisher;
            // Validate required fields
            if (!apartmentData.name ||
                !apartmentData.ownerCompany ||
                !apartmentData.status ||
                !apartmentData.type ||
                !apartmentData.price ||
                !apartmentData.cityId ||
                !publisherData.name ||
                !publisherData.email) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            // Create or find publisher
            let publisherId;
            // Check if publisher with this email already exists
            const existingPublisher = await this.publisherRepository.findByEmail(publisherData.email);
            if (existingPublisher) {
                publisherId = existingPublisher.id;
            }
            else {
                // Create new publisher
                const saltRounds = 10;
                const newPublisher = await this.publisherRepository.create({
                    name: publisherData.name,
                    email: publisherData.email,
                    phoneNumber: publisherData.phoneNumber,
                });
                publisherId = newPublisher.id;
            }
            // Set publisher ID in apartment data
            apartmentData.publisherId = publisherId;
            // Create apartment
            const apartment = await this.apartmentRepository.create(apartmentData);
            res.status(201).json(apartment);
        }
        catch (error) {
            console.error("Error creating apartment:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.ApartmentController = ApartmentController;
