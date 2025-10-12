"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const password_util_1 = require("../utils/password.util");
const email_util_1 = require("../utils/email.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../config"));
class AuthService {
    async register(userData) {
        const { email, password, name, company } = userData;
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await (0, password_util_1.hashPassword)(password);
        const user = await User_1.default.create({
            email,
            password: hashedPassword,
            name,
            company,
            subscriptionType: "free",
            role: "user",
        });
        await (0, email_util_1.sendWelcomeEmail)(email, name);
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await (0, password_util_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
            expiresIn: config_1.default.jwtExpiresIn,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
            expiresIn: "30d",
        });
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwtSecret);
            const newAccessToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
                expiresIn: config_1.default.jwtExpiresIn,
            });
            return newAccessToken;
        }
        catch (error) {
            throw new Error("Invalid refresh token");
        }
    }
    async getUserById(id) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }
    async updateUserProfile(id, updateData) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        await user.update(updateData);
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }
    async changePassword(id, currentPassword, newPassword) {
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Check current password
        const isCurrentPasswordValid = await (0, password_util_1.comparePassword)(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new Error("Current password is incorrect");
        }
        // Hash new password
        const hashedNewPassword = await (0, password_util_1.hashPassword)(newPassword);
        // Update password
        await user.update({ password: hashedNewPassword });
    }
    async setNewPasswordViaEmail(data) {
        try {
            const user = await User_1.default.findByPk(data.userId);
            if (!user)
                throw new Error("User not found!");
            const hashedPassword = await (0, password_util_1.hashPassword)(data.password);
            user.password = hashedPassword;
            await user.save();
            return "Everything is working properly!";
        }
        catch (error) {
            throw new Error("Failed to send password to the email!");
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map