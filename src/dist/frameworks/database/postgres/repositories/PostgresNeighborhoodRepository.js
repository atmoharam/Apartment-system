"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresNeighborhoodRepository = void 0;
const index_1 = require("../index");
class PostgresNeighborhoodRepository {
    async findAll(cityId) {
        let query = "SELECT * FROM neighborhood";
        const values = [];
        if (cityId) {
            query += " WHERE city_id = $1";
            values.push(cityId);
        }
        query += " ORDER BY name";
        const { rows } = await index_1.pool.query(query, values);
        return rows.map(this.mapToEntity);
    }
    async findById(id) {
        const { rows } = await index_1.pool.query("SELECT * FROM neighborhood WHERE id = $1", [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async create(neighborhood) {
        const { rows } = await index_1.pool.query("INSERT INTO neighborhood(name, city_id) VALUES($1, $2) RETURNING *", [
            neighborhood.name,
            neighborhood.cityId,
        ]);
        return this.mapToEntity(rows[0]);
    }
    async update(id, neighborhood) {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        if (neighborhood.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(neighborhood.name);
        }
        if (neighborhood.cityId !== undefined) {
            updates.push(`city_id = $${paramIndex++}`);
            values.push(neighborhood.cityId);
        }
        if (updates.length === 0) {
            return this.findById(id);
        }
        values.push(id);
        const { rows } = await index_1.pool.query(`UPDATE neighborhood SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`, values);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async delete(id) {
        const { rowCount } = await index_1.pool.query("DELETE FROM neighborhood WHERE id = $1", [id]);
        if (rowCount && rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    mapToEntity(row) {
        return {
            id: row.id,
            name: row.name,
            cityId: row.city_id,
        };
    }
}
exports.PostgresNeighborhoodRepository = PostgresNeighborhoodRepository;
