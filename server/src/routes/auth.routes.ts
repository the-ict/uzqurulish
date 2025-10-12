import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { Router } from 'express';
import Joi from 'joi';

const router = Router();
const authController = new AuthController();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  company: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  company: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

// Routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, validate(updateProfileSchema), authController.updateProfile);
router.put('/password', authenticateToken, validate(changePasswordSchema), authController.changePassword);
router.post("/reset/confirm", authenticateToken, authController.setNewPasswordViaEmail);
router.post("/reset", authController.resetPassword);

export default router;