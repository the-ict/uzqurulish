import dotenv from 'dotenv';

dotenv.config();

console.log("payme merchant id: ", process.env.PAYME_MERCHANT_ID)
console.log("payme secret key: ", process.env.PAYME_SECRET_KEY)

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  uploadDir: process.env.UPLOAD_DIR || 'uploads/',
  maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
  paymeApiUrl: process.env.PAYME_API_URL || 'https://checkout.test.paycom.uz/api',
  paymeMerchantId: process.env.PAYME_MERCHANT_ID || '',
  paymeSecretKey: process.env.PAYME_SECRET_KEY || '',
};