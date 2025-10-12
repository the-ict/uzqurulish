"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const config_1 = __importDefault(require("./config"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const startServer = async () => {
    try {
        // Test database connection
        await (0, database_1.testConnection)();
        // Sync database models
        await database_1.sequelize.sync({ alter: true });
        // Create HTTP server
        const server = (0, http_1.createServer)(app_1.default);
        // Initialize Socket.IO
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.CLIENT_URL || "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });
        // Start server
        const port = config_1.default.port;
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Environment: ${config_1.default.nodeEnv}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map