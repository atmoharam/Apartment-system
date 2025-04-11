import express from "express"
import type { Request, Response } from "express"
import { PostgresPublisherRepository } from "../../frameworks/database/postgres/repositories/PostgresPublisherRepository"
import type { Publisher } from "../../domain/entities/Publisher"

const router = express.Router()
const publisherRepository = new PostgresPublisherRepository()

router.get("/", async (req: Request, res: Response) => {
  try {
    const publishers = await publisherRepository.findAll()
    res.status(200).json(publishers)
  } catch (error) {
    console.error("Error getting publishers:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid publisher ID" })
      return
    }

    const publisher = await publisherRepository.findById(id)

    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" })
      return
    }

    // Remove password hash from response
    res.status(200).json(publisher)
  } catch (error) {
    console.error("Error getting publisher by ID:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.post("/", async (req: Request, res: Response) => {
  try {
    const publisherData = req.body as Omit<Publisher, "passwordHash"> & { password: string }

    if (!publisherData.name || !publisherData.email || !publisherData.password) {
      res.status(400).json({ message: "Name, email, and password are required" })
      return
    }

    // Check if email already exists
    const existingPublisher = await publisherRepository.findByEmail(publisherData.email)

    if (existingPublisher) {
      res.status(409).json({ message: "Email already in use" })
      return
    }

    const publisher = await publisherRepository.create({
      name: publisherData.name,
      email: publisherData.email,
      phoneNumber: publisherData.phoneNumber,
    })

    // Remove password hash from response

    res.status(201).json(publisher)
  } catch (error) {
    console.error("Error creating publisher:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid publisher ID" })
      return
    }

    // Check if publisher exists
    const existingPublisher = await publisherRepository.findById(id)

    if (!existingPublisher) {
      res.status(404).json({ message: "Publisher not found" })
      return
    }
    res.status(200).json(existingPublisher)
  } catch (error) {
    console.error("Error updating publisher:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export { router as publisherRoutes }
