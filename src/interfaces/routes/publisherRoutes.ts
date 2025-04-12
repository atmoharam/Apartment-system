import express from "express"
import {PostgresPublisherRepository} from "../../frameworks/database/postgres/repositories/PostgresPublisherRepository"
import {PublisherController} from "../controllers/PublisherController"

const router = express.Router()
const publisherRepository = new PostgresPublisherRepository()
const publisherController = new PublisherController(publisherRepository)

router.get("/", ( req, res ) => publisherController.getAllPublishers(req, res))
router.get("/:id", ( req, res ) => publisherController.getPublisherById(req, res))
router.post("/", ( req, res ) => publisherController.createPublisher(req, res))
router.put("/:id", ( req, res ) => publisherController.updatePublisher(req, res))

export {router as publisherRoutes}