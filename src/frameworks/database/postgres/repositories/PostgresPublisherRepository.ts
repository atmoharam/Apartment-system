import { pool } from "../index"
import type { Publisher } from "../../../../domain/entities/Publisher"
import type { PublisherRepository } from "../../../../domain/repositories/PublisherRepository"

export class PostgresPublisherRepository implements PublisherRepository {
  async findAll(): Promise<Publisher[]> {
    const { rows } = await pool.query("SELECT * FROM publisher ORDER BY name")
    return rows.map(this.mapToEntity)
  }

  async findById(id: number): Promise<Publisher | null> {
    const { rows } = await pool.query("SELECT * FROM publisher WHERE id = $1", [id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async findByEmail(email: string): Promise<Publisher | null> {
    const { rows } = await pool.query("SELECT * FROM publisher WHERE email = $1", [email])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async create(publisher: Publisher): Promise<Publisher> {
    const { rows } = await pool.query(
      "INSERT INTO publisher(name, email, phone_number) VALUES($1, $2, $3) RETURNING *",
      [publisher.name, publisher.email, publisher.phoneNumber],
    )

    return this.mapToEntity(rows[0])
  }


  private mapToEntity(row: any): Publisher {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phoneNumber: row.phone_number,
      createdAt: row.created_at,
    }
  }
}
