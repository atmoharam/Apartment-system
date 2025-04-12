"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.benefitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PostgresBenefitRepository_1 = require("../../frameworks/database/postgres/repositories/PostgresBenefitRepository");
const router = express_1.default.Router();
exports.benefitRoutes = router;
const benefitRepository = new PostgresBenefitRepository_1.PostgresBenefitRepository();
router.get("/", async (req, res) => {
    try {
        const benefits = await benefitRepository.findAll();
        res.status(200).json(benefits);
    }
    catch (error) {
        console.error("Error getting benefits:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid benefit ID" });
            return;
        }
        const benefit = await benefitRepository.findById(id);
        if (!benefit) {
            res.status(404).json({ message: "Benefit not found" });
            return;
        }
        res.status(200).json(benefit);
    }
    catch (error) {
        console.error("Error getting benefit by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
