import { Pool } from "pg"
import { config } from "../../../config"

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
})

export const dbInit = async (): Promise<void> => {
  try {
    const client = await pool.connect()
    console.log("Connected to PostgreSQL database")
    client.release()
  } catch (error) {
    console.error("Failed to connect to PostgreSQL database:", error)
    throw error
  }
}

export { pool }
