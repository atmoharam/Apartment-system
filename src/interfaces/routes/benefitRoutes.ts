import express from "express"
import {PostgresBenefitRepository} from "../../frameworks/database/postgres/repositories/PostgresBenefitRepository"
import BenefitController from "../controllers/BenefitController";

const router = express.Router()
const benefitRepository = new PostgresBenefitRepository()
const benefitController = new BenefitController(benefitRepository)

router.get("/", ( req, res ) => benefitController.getAllBenefits(req, res))
router.get("/:id", ( req, res ) => benefitController.getBenefitById(req, res))


export {router as benefitRoutes}