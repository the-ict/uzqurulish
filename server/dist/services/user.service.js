"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const password_util_1 = require("../utils/password.util");
class UserService {
    async getUserProfile(id) {
        const user = await User_1.default.findByPk(id, {
            attributes: {
                exclude: ['password'],
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user.toJSON();
    }
    async updateUserProfile(id, updateData) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update(updateData);
        return user.toJSON();
    }
    async changePassword(id, passwordData) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        const { currentPassword, newPassword } = passwordData;
        // Check current password
        const isCurrentPasswordValid = await (0, password_util_1.comparePassword)(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new Error('Current password is incorrect');
        }
        // Hash new password
        const hashedNewPassword = await (0, password_util_1.hashPassword)(newPassword);
        // Update password
        await user.update({ password: hashedNewPassword });
    }
    async updateSubscription(id, subscriptionType) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        // Calculate expiration date
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        await user.update({
            subscriptionType,
            subscriptionExpires: expirationDate,
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map