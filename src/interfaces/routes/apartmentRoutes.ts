import express from "express"
import { ApartmentController } from "../controllers/ApartmentController"

const router = express.Router()
const apartmentController = new ApartmentController()

router.get("/", (req, res) => apartmentController.getAllApartments(req, res))
router.get("/:id", (req, res) => apartmentController.getApartmentById(req, res))
router.post("/", (req, res) => apartmentController.createApartment(req, res))

export { router as apartmentRoutes }
