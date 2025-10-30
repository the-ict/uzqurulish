import app from './app';
import { sequelize, testConnection } from './config/database';
import config from './config';
import { createServer } from 'http';
import { Server } from 'socket.io';

const startServer = async () => {
  try {
    await testConnection();

    await sequelize.sync({ alter: true });

    const server = createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
      }
    });

    const port = config.port;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();