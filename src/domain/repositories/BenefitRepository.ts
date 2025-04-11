import type { Benefit } from "../entities/Benefit"

export interface BenefitRepository {
  findAll(): Promise<Benefit[]>
  findById(id: number): Promise<Benefit | null>
  create(benefit: Benefit): Promise<Benefit>
  update(id: number, benefit: Partial<Benefit>): Promise<Benefit | null>
  delete(id: number): Promise<boolean>
}
