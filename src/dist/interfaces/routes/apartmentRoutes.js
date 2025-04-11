"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ApartmentController_1 = require("../controllers/ApartmentController");
const router = express_1.default.Router();
exports.apartmentRoutes = router;
const apartmentController = new ApartmentController_1.ApartmentController();
router.get("/", (req, res) => apartmentController.getAllApartments(req, res));
router.get("/:id", (req, res) => apartmentController.getApartmentById(req, res));
router.post("/", (req, res) => apartmentController.createApartment(req, res));
