"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PostgresCityRepository_1 = require("../../frameworks/database/postgres/repositories/PostgresCityRepository");
const router = express_1.default.Router();
exports.cityRoutes = router;
const cityRepository = new PostgresCityRepository_1.PostgresCityRepository();
router.get("/", async (req, res) => {
    try {
        const cities = await cityRepository.findAll();
        res.status(200).json(cities);
    }
    catch (error) {
        console.error("Error getting cities:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
