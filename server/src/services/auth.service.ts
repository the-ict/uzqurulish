import { hashPassword, comparePassword } from "../utils/password.util";
import { sendWelcomeEmail } from "../utils/email.util";
import jwt, { SignOptions } from "jsonwebtoken";
import User from "../models/User";
import {
  IUserResponse,
  IRegisterInput,
  ILoginInput,
  IPayload,
} from "../types/auth.types";
import config from "../config";

export class AuthService {
  async register(userData: IRegisterInput): Promise<IUserResponse> {
    const { email, password, name, company } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      company,
      subscriptionType: "free",
      role: "user",
    });

    await sendWelcomeEmail(email, name);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async login(loginData: ILoginInput): Promise<{
    user: IUserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = loginData;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload: IPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(
      payload,
      config.jwtSecret as string,
      {
        expiresIn: config.jwtExpiresIn,
      } as SignOptions
    );

    const refreshToken = jwt.sign(
      payload,
      config.jwtSecret as string,
      {
        expiresIn: "30d",
      } as SignOptions
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(
        refreshToken,
        config.jwtSecret as string
      ) as IPayload;

      const newAccessToken = jwt.sign(
        payload,
        config.jwtSecret as string,
        {
          expiresIn: config.jwtExpiresIn,
        } as SignOptions
      );

      return newAccessToken;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async getUserById(id: number): Promise<IUserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async updateUserProfile(
    id: number,
    updateData: Partial<
      Omit<IUserResponse, "id" | "role" | "createdAt" | "updatedAt">
    >
  ): Promise<IUserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    await user.update(updateData);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Check current password
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await user.update({ password: hashedNewPassword });
  }

  async setNewPasswordViaEmail(data: {
    password: string;
    userId: string | number;
  }) {
    try {
      const user = await User.findByPk(data.userId)

      if(!user) throw new Error("User not found!")
        
      const hashedPassword = await hashPassword(data.password);
      
      user.password = hashedPassword;

      await user.save()

      return "Everything is working properly!"
    } catch (error) {
      throw new Error("Failed to send password to the email!")
    }
  }
}
