import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import Joi from 'joi';

const router = Router();
const userController = new UserController();

// Validation schemas
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  company: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscriptionType: Joi.string().valid('free', 'pro', 'business').required(),
});

// Routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, validate(updateProfileSchema), userController.updateProfile);
router.put('/password', authenticateToken, validate(changePasswordSchema), userController.changePassword);
router.put('/subscription', authenticateToken, validate(updateSubscriptionSchema), userController.updateSubscription);

export default router;