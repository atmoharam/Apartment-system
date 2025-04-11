import type { Neighborhood } from "../entities/Neighborhood"

export interface NeighborhoodRepository {
  findAll(cityId?: number): Promise<Neighborhood[]>
  findById(id: number): Promise<Neighborhood | null>
  create(neighborhood: Neighborhood): Promise<Neighborhood>
  update(id: number, neighborhood: Partial<Neighborhood>): Promise<Neighborhood | null>
  delete(id: number): Promise<boolean>
}
