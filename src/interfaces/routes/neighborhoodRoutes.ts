import express from "express"
import type {Request, Response} from "express"
import {
    PostgresNeighborhoodRepository
} from "../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository"
import {NeighborhoodController} from "../controllers/NeighborhoodController"

const router = express.Router()
const neighborhoodRepository = new PostgresNeighborhoodRepository()
const neighborhoodController = new NeighborhoodController(neighborhoodRepository)

router.get("/", ( req, res ) => neighborhoodController.getAllNeighborhoods(req, res))
router.get("/:id", ( req, res ) => neighborhoodController.getNeighborhoodById(req, res))
router.post("/", ( req, res ) => neighborhoodController.createNeighborhood(req, res))
router.put("/:id", ( req, res ) => neighborhoodController.updateNeighborhood(req, res))
router.delete("/:id", ( req, res ) => neighborhoodController.deleteNeighborhood(req, res))



export {router as neighborhoodRoutes}