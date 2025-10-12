"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    name: joi_1.default.string().min(2).required(),
    company: joi_1.default.string().optional(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const updateProfileSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).optional(),
    company: joi_1.default.string().optional(),
});
const changePasswordSchema = joi_1.default.object({
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(6).required(),
});
// Routes
router.post('/register', (0, validation_middleware_1.validate)(registerSchema), authController.register);
router.post('/login', (0, validation_middleware_1.validate)(loginSchema), authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/profile', auth_middleware_1.authenticateToken, authController.getProfile);
router.put('/profile', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(updateProfileSchema), authController.updateProfile);
router.put('/password', auth_middleware_1.authenticateToken, (0, validation_middleware_1.validate)(changePasswordSchema), authController.changePassword);
router.post("/reset/confirm", auth_middleware_1.authenticateToken, authController.setNewPasswordViaEmail);
router.post("/reset", authController.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map