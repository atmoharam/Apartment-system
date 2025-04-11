"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresBenefitRepository = void 0;
const index_1 = require("../index");
class PostgresBenefitRepository {
    async findAll() {
        const { rows } = await index_1.pool.query("SELECT * FROM benefit ORDER BY name");
        return rows.map(this.mapToEntity);
    }
    async findById(id) {
        const { rows } = await index_1.pool.query("SELECT * FROM benefit WHERE id = $1", [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async create(benefit) {
        const { rows } = await index_1.pool.query("INSERT INTO benefit(name) VALUES($1) RETURNING *", [benefit.name]);
        return this.mapToEntity(rows[0]);
    }
    async update(id, benefit) {
        const { rows } = await index_1.pool.query("UPDATE benefit SET name = $1 WHERE id = $2 RETURNING *", [benefit.name, id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async delete(id) {
        const { rowCount } = await index_1.pool.query("DELETE FROM benefit WHERE id = $1", [id]);
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
exports.PostgresBenefitRepository = PostgresBenefitRepository;
