"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.dbInit = void 0;
const pg_1 = require("pg");
const config_1 = require("../../../config");
const pool = new pg_1.Pool({
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    user: config_1.config.db.user,
    password: config_1.config.db.password,
    database: config_1.config.db.database,
});
exports.pool = pool;
const dbInit = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL database");
        client.release();
    }
    catch (error) {
        console.error("Failed to connect to PostgreSQL database:", error);
        throw error;
    }
};
exports.dbInit = dbInit;
