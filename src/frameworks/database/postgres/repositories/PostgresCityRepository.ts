import { pool } from "../index"
import type { City } from "../../../../domain/entities/City"
import type { CityRepository } from "../../../../domain/repositories/CityRepository"

export class PostgresCityRepository implements CityRepository {
  async findAll(): Promise<City[]> {
    const { rows } = await pool.query("SELECT * FROM city ORDER BY name")
    return rows.map(this.mapToEntity)
  }

  async findById(id: number): Promise<City | null> {
    const { rows } = await pool.query("SELECT * FROM city WHERE id = $1", [id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async create(city: City): Promise<City> {
    const { rows } = await pool.query("INSERT INTO city(name) VALUES($1) RETURNING *", [city.name])

    return this.mapToEntity(rows[0])
  }

  async update(id: number, city: Partial<City>): Promise<City | null> {
    const { rows } = await pool.query("UPDATE city SET name = $1 WHERE id = $2 RETURNING *", [city.name, id])

    if (rows.length === 0) {
      return null
    }

    return this.mapToEntity(rows[0])
  }

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query("DELETE FROM city WHERE id = $1", [id])

    if(rowCount && rowCount > 0){
      return true
    }
    else{
      return false
    }
  }

  private mapToEntity(row: any): City {
    return {
      id: row.id,
      name: row.name,
    }
  }
}
