"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const postgres_1 = require("./frameworks/database/postgres");
const apartmentRoutes_1 = require("./interfaces/routes/apartmentRoutes");
const cityRoutes_1 = require("./interfaces/routes/cityRoutes");
const neighborhoodRoutes_1 = require("./interfaces/routes/neighborhoodRoutes");
const benefitRoutes_1 = require("./interfaces/routes/benefitRoutes");
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        'http://localhost:3001', // Local frontend
        'http://frontend:3001', // Docker frontend
        // Add other origins as needed
    ],
    credentials: true
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use("/api/apartments", apartmentRoutes_1.apartmentRoutes);
app.use("/api/cities", cityRoutes_1.cityRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes_1.neighborhoodRoutes);
app.use("/api/benefits", benefitRoutes_1.benefitRoutes);
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Initialize database and start server
const startServer = async () => {
    try {
        await (0, postgres_1.dbInit)();
        app.listen(config_1.config.port, () => {
            console.log(`Server running on port ${config_1.config.port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
