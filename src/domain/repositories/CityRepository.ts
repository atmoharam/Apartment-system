import type { City } from "../entities/City"

export interface CityRepository {
  findAll(): Promise<City[]>
  findById(id: number): Promise<City | null>
  create(city: City): Promise<City>
  update(id: number, city: Partial<City>): Promise<City | null>
  delete(id: number): Promise<boolean>
}
