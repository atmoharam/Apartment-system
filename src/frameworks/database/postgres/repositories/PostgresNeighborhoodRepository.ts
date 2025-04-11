import { pool } from "../index"
import type { Neighborhood } from "../../../../domain/entities/Neighborhood"
import type { NeighborhoodRepository } from "../../../../domain/repositories/NeighborhoodRepository"

export class PostgresNeighborhoodRepository implements NeighborhoodRepository {
  async findAll(cityId?: number): Promise<Neighborhood[]> {
    let query = "SELECT * FROM neighborhood"
    const values: any[] = []

    if (cityId) {
      query += " WHERE city_id = $1"
      values.push(cityId)
    }

    query += " ORDER BY name"

    const { rows } = await pool.query(query, values)
    return rows.map(this.mapToEntity)
  }

  async findById(id: number): Promise<Neighborhood | null> {
    const { rows } = await pool.query("SELECT * FROM neighborhood WHERE id = $1", [id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async create(neighborhood: Neighborhood): Promise<Neighborhood> {
    const { rows } = await pool.query("INSERT INTO neighborhood(name, city_id) VALUES($1, $2) RETURNING *", [
      neighborhood.name,
      neighborhood.cityId,
    ])

    return this.mapToEntity(rows[0])
  }

  async update(id: number, neighborhood: Partial<Neighborhood>): Promise<Neighborhood | null> {
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (neighborhood.name !== undefined) {
      updates.push(`name = $${paramIndex++}`)
      values.push(neighborhood.name)
    }

    if (neighborhood.cityId !== undefined) {
      updates.push(`city_id = $${paramIndex++}`)
      values.push(neighborhood.cityId)
    }

    if (updates.length === 0) {
      return this.findById(id)
    }

    values.push(id)

    const { rows } = await pool.query(
      `UPDATE neighborhood SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      values,
    )

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query("DELETE FROM neighborhood WHERE id = $1", [id])

    if(rowCount && rowCount > 0){
      return true
    }
    else{
      return false
    }
  }

  private mapToEntity(row: any): Neighborhood {
    return {
      id: row.id,
      name: row.name,
      cityId: row.city_id,
    }
  }
}
