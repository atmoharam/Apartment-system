import express from "express"
import cors from "cors"
import { config } from "./config"
import { dbInit } from "./frameworks/database/postgres"
import { apartmentRoutes } from "./interfaces/routes/apartmentRoutes"
import { cityRoutes } from "./interfaces/routes/cityRoutes"
import { neighborhoodRoutes } from "./interfaces/routes/neighborhoodRoutes"
import { benefitRoutes } from "./interfaces/routes/benefitRoutes"

const app = express()
const corsOptions = {
  origin: [
    'http://localhost:3001',    // Local frontend
    'http://frontend:3001',     // Docker frontend
    // Add other origins as needed
  ],
  credentials: true
};

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use("/api/apartments", apartmentRoutes)
app.use("/api/cities", cityRoutes)
app.use("/api/neighborhoods", neighborhoodRoutes)
app.use("/api/benefits", benefitRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Initialize database and start server
const startServer = async () => {
  try {
    await dbInit()
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
