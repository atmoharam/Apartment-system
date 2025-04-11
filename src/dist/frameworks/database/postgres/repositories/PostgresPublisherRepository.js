"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresPublisherRepository = void 0;
const index_1 = require("../index");
class PostgresPublisherRepository {
    async findAll() {
        const { rows } = await index_1.pool.query("SELECT * FROM publisher ORDER BY name");
        return rows.map(this.mapToEntity);
    }
    async findById(id) {
        const { rows } = await index_1.pool.query("SELECT * FROM publisher WHERE id = $1", [id]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async findByEmail(email) {
        const { rows } = await index_1.pool.query("SELECT * FROM publisher WHERE email = $1", [email]);
        if (rows.length === 0) {
            return null;
        }
        return this.mapToEntity(rows[0]);
    }
    async create(publisher) {
        const { rows } = await index_1.pool.query("INSERT INTO publisher(name, email, phone_number) VALUES($1, $2, $3) RETURNING *", [publisher.name, publisher.email, publisher.phoneNumber]);
        return this.mapToEntity(rows[0]);
    }
    mapToEntity(row) {
        return {
            id: row.id,
            name: row.name,
            email: row.email,
            phoneNumber: row.phone_number,
            createdAt: row.created_at,
        };
    }
}
exports.PostgresPublisherRepository = PostgresPublisherRepository;
