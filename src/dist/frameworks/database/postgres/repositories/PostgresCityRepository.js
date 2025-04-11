"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCityRepository = void 0;
const index_1 = require("../index");
class PostgresCityRepository {
    async findAll() {
        const { rows } = await index_1.pool.query("SELECT * FROM city ORDER BY name");
        return rows.map(this.mapToEntity);
    }
    async findById(id) {
        const { rows } = await index_1.pool.query("SELECT * FROM city WHERE id = $1", [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async create(city) {
        const { rows } = await index_1.pool.query("INSERT INTO city(name) VALUES($1) RETURNING *", [city.name]);
        return this.mapToEntity(rows[0]);
    }
    async update(id, city) {
        const { rows } = await index_1.pool.query("UPDATE city SET name = $1 WHERE id = $2 RETURNING *", [city.name, id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async delete(id) {
        const { rowCount } = await index_1.pool.query("DELETE FROM city WHERE id = $1", [id]);
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
        };
    }
}
exports.PostgresCityRepository = PostgresCityRepository;
