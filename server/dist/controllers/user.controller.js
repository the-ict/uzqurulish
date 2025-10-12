"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.getProfile = async (req, res) => {
            try {
                const userId = req.user.id;
                const user = await this.userService.getUserProfile(userId);
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
                const user = await this.userService.updateUserProfile(userId, updateData);
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
                const passwordData = req.body;
                await this.userService.changePassword(userId, passwordData);
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
        this.updateSubscription = async (req, res) => {
            try {
                const userId = req.user.id;
                const { subscriptionType } = req.body;
                await this.userService.updateSubscription(userId, subscriptionType);
                res.status(200).json({
                    message: 'Subscription updated successfully',
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map