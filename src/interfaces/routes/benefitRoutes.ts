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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid benefit ID" })
      return
    }

    const benefit = await benefitRepository.findById(id)

    if (!benefit) {
      res.status(404).json({ message: "Benefit not found" })
      return
    }

    res.status(200).json(benefit)
  } catch (error) {
    console.error("Error getting benefit by ID:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export { router as benefitRoutes }
