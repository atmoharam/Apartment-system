import express from "express"
import type { Request, Response } from "express"
import { PostgresNeighborhoodRepository } from "../../frameworks/database/postgres/repositories/PostgresNeighborhoodRepository"

const router = express.Router()
const neighborhoodRepository = new PostgresNeighborhoodRepository()

router.get("/", async (req: Request, res: Response) => {
  try {
    const cityId = req.query.cityId ? Number(req.query.cityId) : undefined
    const neighborhoods = await neighborhoodRepository.findAll(cityId)
    res.status(200).json(neighborhoods)
  } catch (error) {
    console.error("Error getting neighborhoods:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid neighborhood ID" })
      return
    }

    const neighborhood = await neighborhoodRepository.findById(id)

    if (!neighborhood) {
      res.status(404).json({ message: "Neighborhood not found" })
      return
    }

    res.status(200).json(neighborhood)
  } catch (error) {
    console.error("Error getting neighborhood by ID:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export { router as neighborhoodRoutes }
