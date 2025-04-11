import type { Publisher } from "../entities/Publisher"

export interface PublisherRepository {
  findAll(): Promise<Publisher[]>
  findById(id: number): Promise<Publisher | null>
  findByEmail(email: string): Promise<Publisher | null>
  create(publisher: Publisher): Promise<Publisher>
}
