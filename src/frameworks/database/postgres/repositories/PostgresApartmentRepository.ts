import { pool } from "../index"
import type { Apartment, ApartmentStatus, ApartmentType } from "../../../../domain/entities/Apartment"
import type { ApartmentRepository } from "../../../../domain/repositories/ApartmentRepository"

export class PostgresApartmentRepository implements ApartmentRepository {
  async findAll(
      filters?: Partial<Apartment> & { minPrice?: number; maxPrice?: number; benefitIds?: number[] },
  ): Promise<Apartment[]> {
    let query = `
      SELECT DISTINCT a.* FROM apartment a
    `
    // Join with apartment_benefit if filtering by benefits
    if (filters?.benefitIds && filters.benefitIds.length > 0) {
      query += `
        JOIN apartment_benefit ab ON a.id = ab.apartment_id
        WHERE ab.benefit_id IN (${filters.benefitIds.join(",")})
      `
    } else {
      query += " WHERE 1=1"
    }

    const values: any[] = []
    let paramIndex = 1

    if (filters) {
      if (filters.cityId) {
        query += ` AND a.city_id = $${paramIndex}`
        values.push(filters.cityId)
        paramIndex++
      }

      if (filters.neighborhoodId) {
        query += ` AND a.neighborhood_id = $${paramIndex}`
        values.push(filters.neighborhoodId)
        paramIndex++
      }

      if (filters.status) {
        query += ` AND a.status = $${paramIndex}`
        values.push(filters.status)
        paramIndex++
      }

      if (filters.type) {
        query += ` AND a.type = $${paramIndex}`
        values.push(filters.type)
        paramIndex++
      }

      if (filters.name) {
        query += ` AND a.name ILIKE $${paramIndex}`
        values.push(`%${filters.name}%`)
        paramIndex++
      }

      if (filters.ownerCompany) {
        query += ` AND a.owner_company ILIKE $${paramIndex}`
        values.push(`%${filters.ownerCompany}%`)
        paramIndex++
      }

      if (filters.minPrice !== undefined) {
        query += ` AND a.price >= $${paramIndex}`
        values.push(filters.minPrice)
        paramIndex++
      }

      if (filters.maxPrice !== undefined) {
        query += ` AND a.price <= $${paramIndex}`
        values.push(filters.maxPrice)
        paramIndex++
      }
    }

    query += " ORDER BY a.created_at DESC"

    const { rows } = await pool.query(query, values)
    const apartments = rows.map(this.mapToEntity)

    for (const apartment of apartments) {
      if(apartment && apartment.id){
        apartment.benefits = await this.getBenefits(apartment.id)
      }
      if (apartment.benefits && apartment.benefits.length > 0) {
        const { rows: benefitRows } = await pool.query(
            `SELECT name FROM benefit WHERE id IN (${apartment.benefits.join(",")})`,
        )
        apartment.benefitNames = benefitRows.map((row) => row.name)
      }
    }

    for (const apartment of apartments) {
      if (apartment.neighborhoodId) {
        const { rows: neighborhoodRows } = await pool.query("SELECT name FROM neighborhood WHERE id = $1", [
          apartment.neighborhoodId,
        ])
        if (neighborhoodRows.length > 0) {
          apartment.neighborhoodName = neighborhoodRows[0].name
        }
      }
    }



      return apartments
  }

  async findById(id: number): Promise<Apartment | null> {
    const { rows } = await pool.query("SELECT * FROM apartment WHERE id = $1", [id])

    if (rows.length === 0) {
      return null
    }

    const apartment = this.mapToEntity(rows[0])

    // Get benefits
    apartment.benefits = await this.getBenefits(id)

    // Get city name
    if (apartment.cityId) {
      const { rows: cityRows } = await pool.query("SELECT name FROM city WHERE id = $1", [apartment.cityId])
      if (cityRows.length > 0) {
        apartment.cityName = cityRows[0].name
      }
    }

    // Get neighborhood name
    if (apartment.neighborhoodId) {
      const { rows: neighborhoodRows } = await pool.query("SELECT name FROM neighborhood WHERE id = $1", [
        apartment.neighborhoodId,
      ])
      if (neighborhoodRows.length > 0) {
        apartment.neighborhoodName = neighborhoodRows[0].name
      }
    }

    // Get benefit names
    if (apartment.benefits && apartment.benefits.length > 0) {
      const { rows: benefitRows } = await pool.query(
          `SELECT name FROM benefit WHERE id IN (${apartment.benefits.join(",")})`,
      )
      apartment.benefitNames = benefitRows.map((row) => row.name)
    }

    // Get publisher info if available
    if (apartment.publisherId) {
      const { rows: publisherRows } = await pool.query(
          "SELECT id, name, email, phone_number, created_at FROM publisher WHERE id = $1",
          [apartment.publisherId],
      )
      if (publisherRows.length > 0) {
        apartment.publisher = {
          id: publisherRows[0].id,
          name: publisherRows[0].name,
          email: publisherRows[0].email,
          phoneNumber: publisherRows[0].phone_number,
          createdAt: publisherRows[0].created_at,
        }
      }
    }

    return apartment
  }

  async create(apartment: Apartment): Promise<Apartment> {
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      const { rows } = await client.query(
          `INSERT INTO apartment(
          name, owner_company, status, type, price, rooms_count, bathrooms_count, 
          size, photo_urls, street_name, building_number, zip_code, 
          latitude, longitude, header_description, description, 
          publisher_id, city_id, neighborhood_id
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING *`,
          [
            apartment.name,
            apartment.ownerCompany,
            apartment.status,
            apartment.type,
            apartment.price,
            apartment.roomsCount,
            apartment.bathroomsCount,
            apartment.size,
            apartment.photoUrls,
            apartment.streetName,
            apartment.buildingNumber,
            apartment.zipCode,
            apartment.latitude,
            apartment.longitude,
            apartment.headerDescription,
            apartment.description,
            apartment.publisherId,
            apartment.cityId,
            apartment.neighborhoodId,
          ],
      )

      const newApartment = this.mapToEntity(rows[0])

      // Add benefits if provided
      if (apartment.benefits && apartment.benefits.length > 0) {
        for (const benefitId of apartment.benefits) {
          await client.query("INSERT INTO apartment_benefit(apartment_id, benefit_id) VALUES($1, $2)", [
            newApartment.id,
            benefitId,
          ])
        }
      }

      await client.query("COMMIT")

      // Get city name
      if (newApartment.cityId) {
        const { rows: cityRows } = await pool.query("SELECT name FROM city WHERE id = $1", [newApartment.cityId])
        if (cityRows.length > 0) {
          newApartment.cityName = cityRows[0].name
        }
      }

      // Get neighborhood name
      if (newApartment.neighborhoodId) {
        const { rows: neighborhoodRows } = await pool.query("SELECT name FROM neighborhood WHERE id = $1", [
          newApartment.neighborhoodId,
        ])
        if (neighborhoodRows.length > 0) {
          newApartment.neighborhoodName = neighborhoodRows[0].name
        }
      }

      // Set benefits
      newApartment.benefits = apartment.benefits || []

      return newApartment
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  async update(id: number, apartment: Partial<Apartment>): Promise<Apartment | null> {
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Build update query dynamically based on provided fields
      const updates: string[] = []
      const values: any[] = []
      let paramIndex = 1

      if (apartment.name !== undefined) {
        updates.push(`name = ${paramIndex++}`)
        values.push(apartment.name)
      }

      if (apartment.ownerCompany !== undefined) {
        updates.push(`owner_company = ${paramIndex++}`)
        values.push(apartment.ownerCompany)
      }

      if (apartment.status !== undefined) {
        updates.push(`status = ${paramIndex++}`)
        values.push(apartment.status)
      }

      if (apartment.type !== undefined) {
        updates.push(`type = ${paramIndex++}`)
        values.push(apartment.type)
      }

      if (apartment.roomsCount !== undefined) {
        updates.push(`rooms_count = ${paramIndex++}`)
        values.push(apartment.roomsCount)
      }

      if (apartment.bathroomsCount !== undefined) {
        updates.push(`bathrooms_count = ${paramIndex++}`)
        values.push(apartment.bathroomsCount)
      }

      if (apartment.size !== undefined) {
        updates.push(`size = ${paramIndex++}`)
        values.push(apartment.size)
      }

      if (apartment.photoUrls !== undefined) {
        updates.push(`photo_urls = ${paramIndex++}`)
        values.push(apartment.photoUrls)
      }

      if (apartment.streetName !== undefined) {
        updates.push(`street_name = ${paramIndex++}`)
        values.push(apartment.streetName)
      }

      if (apartment.buildingNumber !== undefined) {
        updates.push(`building_number = ${paramIndex++}`)
        values.push(apartment.buildingNumber)
      }

      if (apartment.zipCode !== undefined) {
        updates.push(`zip_code = ${paramIndex++}`)
        values.push(apartment.zipCode)
      }

      if (apartment.latitude !== undefined) {
        updates.push(`latitude = ${paramIndex++}`)
        values.push(apartment.latitude)
      }

      if (apartment.longitude !== undefined) {
        updates.push(`longitude = ${paramIndex++}`)
        values.push(apartment.longitude)
      }

      if (apartment.headerDescription !== undefined) {
        updates.push(`header_description = ${paramIndex++}`)
        values.push(apartment.headerDescription)
      }

      if (apartment.description !== undefined) {
        updates.push(`description = ${paramIndex++}`)
        values.push(apartment.description)
      }

      if (apartment.publisherId !== undefined) {
        updates.push(`publisher_id = ${paramIndex++}`)
        values.push(apartment.publisherId)
      }

      if (apartment.cityId !== undefined) {
        updates.push(`city_id = ${paramIndex++}`)
        values.push(apartment.cityId)
      }

      if (apartment.neighborhoodId !== undefined) {
        updates.push(`neighborhood_id = ${paramIndex++}`)
        values.push(apartment.neighborhoodId)
      }

      if (updates.length === 0) {
        return this.findById(id)
      }

      values.push(id)

      const { rows } = await client.query(
          `UPDATE apartment SET ${updates.join(", ")} WHERE id = ${paramIndex} RETURNING *`,
          values,
      )

      if (rows.length === 0) {
        await client.query("ROLLBACK")
        return null
      }

      // Update benefits if provided
      if (apartment.benefits) {
        // Remove existing benefits
        await client.query("DELETE FROM apartment_benefit WHERE apartment_id = $1", [id])

        // Add new benefits
        for (const benefitId of apartment.benefits) {
          await client.query("INSERT INTO apartment_benefit(apartment_id, benefit_id) VALUES($1, $2)", [id, benefitId])
        }
      }

      await client.query("COMMIT")

      // Return the updated apartment with all details
      return this.findById(id)
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Delete apartment benefits first
      await client.query("DELETE FROM apartment_benefit WHERE apartment_id = $1", [id])

      // Delete apartment
      const { rowCount } = await client.query("DELETE FROM apartment WHERE id = $1", [id])

      await client.query("COMMIT")

      if(rowCount && rowCount > 0){return true}
      else{return false}
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  async addBenefit(apartmentId: number, benefitId: number): Promise<boolean> {
    try {
      await pool.query(
          "INSERT INTO apartment_benefit(apartment_id, benefit_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
          [apartmentId, benefitId],
      )
      return true
    } catch (error) {
      return false
    }
  }

  async removeBenefit(apartmentId: number, benefitId: number): Promise<boolean> {
    const { rowCount } = await pool.query("DELETE FROM apartment_benefit WHERE apartment_id = $1 AND benefit_id = $2", [
      apartmentId,
      benefitId,
    ])
    if(rowCount && rowCount > 0){return true}
    else{return false}
  }

  async getBenefits(apartmentId: number): Promise<number[]> {
    const { rows } = await pool.query("SELECT benefit_id FROM apartment_benefit WHERE apartment_id = $1", [apartmentId])
    return rows.map((row) => row.benefit_id)
  }

  private mapToEntity(row: any): Apartment {
    return {
      id: row.id,
      name: row.name,
      ownerCompany: row.owner_company,
      status: row.status as ApartmentStatus,
      type: row.type as ApartmentType,
      price: Number.parseFloat(row.price),
      roomsCount: row.rooms_count,
      bathroomsCount: row.bathrooms_count,
      size: row.size,
      photoUrls: row.photo_urls,
      streetName: row.street_name,
      buildingNumber: row.building_number,
      zipCode: row.zip_code,
      latitude: row.latitude,
      longitude: row.longitude,
      headerDescription: row.header_description,
      description: row.description,
      publisherId: row.publisher_id,
      cityId: row.city_id,
      neighborhoodId: row.neighborhood_id,
      createdAt: row.created_at,
    }
  }
}
