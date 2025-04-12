import express from "express"
import {PostgresCityRepository} from "../../frameworks/database/postgres/repositories/PostgresCityRepository"
import CityController from "../controllers/CityController";

const router = express.Router()
const cityRepository = new PostgresCityRepository()
const cityController = new CityController(cityRepository)

router.get("/", ( req, res ) => cityController.getAllCities(req, res))
router.get("/:id", ( req, res ) => cityController.getCityById(req, res))

export {router as cityRoutes}