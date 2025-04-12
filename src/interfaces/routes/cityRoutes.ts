import express from "express"
import type { Request, Response } from "express"
import { PostgresCityRepository } from "../../frameworks/database/postgres/repositories/PostgresCityRepository"

const router = express.Router()
const cityRepository = new PostgresCityRepository()

router.get("/", async (req: Request, res: Response) => {
  try {
    const cities = await cityRepository.findAll()
    res.status(200).json(cities)
  } catch (error) {
    console.error("Error getting cities:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid city ID" })
      return
    }

    const city = await cityRepository.findById(id)

    if (!city) {
      res.status(404).json({ message: "City not found" })
      return
    }

    res.status(200).json(city)
  } catch (error) {
    console.error("Error getting city by ID:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})
export { router as cityRoutes }
