"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Validation schemas
const updateProfileSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).optional(),
    company: joi_1.default.string().optional(),
});
const changePasswordSchema = joi_1.default.object({
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(6).required(),
});
const updateSubscriptionSchema = joi_1.default.object({
    subscriptionType: joi_1.default.string().valid('free', 'pro', 'business').required(),
});
// Routes
router.get('/profile', auth_middleware_1.authenticateToken, userController.getProfile);
router.put('/profile', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateProfileSchema), userController.updateProfile);
router.put('/password', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(changePasswordSchema), userController.changePassword);
router.put('/subscription', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateSubscriptionSchema), userController.updateSubscription);
exports.default = router;
//# sourceMappingURL=user.routes.js.map