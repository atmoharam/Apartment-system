"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neighborhoodRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PostgresNeighborhoodRepository_1 = require("../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository");
const router = express_1.default.Router();
exports.neighborhoodRoutes = router;
const neighborhoodRepository = new PostgresNeighborhoodRepository_1.PostgresNeighborhoodRepository();
router.get("/", async (req, res) => {
    try {
        const cityId = req.query.cityId ? Number(req.query.cityId) : undefined;
        const neighborhoods = await neighborhoodRepository.findAll(cityId);
        res.status(200).json(neighborhoods);
    }
    catch (error) {
        console.error("Error getting neighborhoods:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid neighborhood ID" });
            return;
        }
        const neighborhood = await neighborhoodRepository.findById(id);
        if (!neighborhood) {
            res.status(404).json({ message: "Neighborhood not found" });
            return;
        }
        res.status(200).json(neighborhood);
    }
    catch (error) {
        console.error("Error getting neighborhood by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
