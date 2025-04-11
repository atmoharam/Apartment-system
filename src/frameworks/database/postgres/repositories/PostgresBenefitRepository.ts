import { pool } from "../index"
import type { Benefit } from "../../../../domain/entities/Benefit"
import type { BenefitRepository } from "../../../../domain/repositories/BenefitRepository"

export class PostgresBenefitRepository implements BenefitRepository {
  async findAll(): Promise<Benefit[]> {
    const { rows } = await pool.query("SELECT * FROM benefit ORDER BY name")
    return rows.map(this.mapToEntity)
  }

  async findById(id: number): Promise<Benefit | null> {
    const { rows } = await pool.query("SELECT * FROM benefit WHERE id = $1", [id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async create(benefit: Benefit): Promise<Benefit> {
    const { rows } = await pool.query("INSERT INTO benefit(name) VALUES($1) RETURNING *", [benefit.name])

    return this.mapToEntity(rows[0])
  }

  async update(id: number, benefit: Partial<Benefit>): Promise<Benefit | null> {
    const { rows } = await pool.query("UPDATE benefit SET name = $1 WHERE id = $2 RETURNING *", [benefit.name, id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query("DELETE FROM benefit WHERE id = $1", [id])
    if(rowCount && rowCount > 0){
      return true
    }
    else{
      return false
    }
  }

  private mapToEntity(row: any): Benefit {
    return {
      id: row.id,
      name: row.name,
    }
  }
}
