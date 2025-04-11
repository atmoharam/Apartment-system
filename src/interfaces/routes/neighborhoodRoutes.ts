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

export { router as neighborhoodRoutes }
