import express from "express"
import {ApartmentController} from "../controllers/ApartmentController";
import {PostgresApartmentRepository} from "../../frameworks/database/postgres/repositories/PostgresApartmentRepository";
import {PostgresPublisherRepository} from "../../frameworks/database/postgres/repositories/PostgresPublisherRepository";

const router = express.Router()
const apartmentController = new ApartmentController(new PostgresApartmentRepository(), new PostgresPublisherRepository())

router.get("/", (req, res) => apartmentController.getAllApartments(req, res))
router.get("/:id", (req, res) => apartmentController.getApartmentById(req, res))
router.post("/", (req, res) => apartmentController.createApartment(req, res))

export { router as apartmentRoutes }
