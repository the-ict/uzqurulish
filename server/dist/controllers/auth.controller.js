"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const email_util_1 = require("../utils/email.util");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const userData = req.body;
                const user = await this.authService.register(userData);
                res.status(201).json({
                    message: 'User registered successfully',
                    user,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.login = async (req, res) => {
            try {
                const loginData = req.body;
                const result = await this.authService.login(loginData);
                res.status(200).json({
                    message: 'Login successful',
                    ...result,
                });
            }
            catch (error) {
                res.status(401).json({
                    message: error.message,
                });
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const { refreshToken } = req.body;
                const accessToken = await this.authService.refreshToken(refreshToken);
                res.status(200).json({
                    accessToken,
                });
            }
            catch (error) {
                res.status(403).json({
                    message: error.message,
                });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const userId = req.user.id;
                const user = await this.authService.getUserById(userId);
                res.status(200).json({
                    user,
                });
            }
            catch (error) {
                res.status(404).json({
                    message: error.message,
                });
            }
        };
        this.updateProfile = async (req, res) => {
            try {
                const userId = req.user.id;
                const updateData = req.body;
                const user = await this.authService.updateUserProfile(userId, updateData);
                res.status(200).json({
                    message: 'Profile updated successfully',
                    user,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.changePassword = async (req, res) => {
            try {
                const userId = req.user.id;
                const { currentPassword, newPassword } = req.body;
                await this.authService.changePassword(userId, currentPassword, newPassword);
                res.status(200).json({
                    message: 'Password changed successfully',
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.resetPassword = async (req, res) => {
            console.log("req.body.email: ", req.body.email);
            try {
                await (0, email_util_1.sendPasswordResetEmail)(req.body.email);
                res.status(200).json({
                    message: "Xabar yuborildi!",
                });
            }
            catch (error) {
                res.status(400).json({
                    message: "Xabar yuborishda xatolik yuz berdi!",
                    error: error,
                });
            }
        };
        this.setNewPasswordViaEmail = async (req, res) => {
            try {
                const response = await this.authService.setNewPasswordViaEmail({
                    password: req.body.password,
                    userId: req.user?.id,
                });
                res.status(201).json({
                    message: response
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to send password to the email!");
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map