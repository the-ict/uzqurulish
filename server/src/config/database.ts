import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'uzqurilish_db',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
  },
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, testConnection };