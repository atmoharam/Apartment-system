import express from "express"
import type { Request, Response } from "express"
import { PostgresBenefitRepository } from "../../frameworks/database/postgres/repositories/PostgresBenefitRepository"

const router = express.Router()
const benefitRepository = new PostgresBenefitRepository()

router.get("/", async (req: Request, res: Response) => {
  try {
    const benefits = await benefitRepository.findAll()
    res.status(200).json(benefits)
  } catch (error) {
    console.error("Error getting benefits:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export { router as benefitRoutes }
