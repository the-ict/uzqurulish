/// <reference path="../types/express/index.d.ts" />
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IRegisterInput, ILoginInput } from '../types/auth.types';
import { sendPasswordResetEmail } from '../utils/email.util';

export class AuthController {
  private authService: AuthService;
  
  constructor() {
    this.authService = new AuthService();
  }
  
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: IRegisterInput = req.body;
      const user = await this.authService.register(userData);
      
      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
  
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: ILoginInput = req.body;
      const result = await this.authService.login(loginData);
      
      res.status(200).json({
        message: 'Login successful',
        ...result,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  };
  
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const accessToken = await this.authService.refreshToken(refreshToken);
      
      res.status(200).json({
        accessToken,
      });
    } catch (error:any) {
      res.status(403).json({
        message: error.message,
      });
    }
  };
  
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const user = await this.authService.getUserById(userId);
      
      res.status(200).json({
        user,
      });
    } catch (error:any) {
      res.status(404).json({
        message: error.message,
      });
    }
  };
  
  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const updateData = req.body;
      const user = await this.authService.updateUserProfile(userId, updateData);
      
      res.status(200).json({
        message: 'Profile updated successfully',
        user,
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
  
  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const { currentPassword, newPassword } = req.body;
      
      await this.authService.changePassword(userId, currentPassword, newPassword);
      
      res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    console.log("req.body.email: ", req.body.email)
    try {
      await sendPasswordResetEmail(req.body.email);
      
      res.status(200).json({
        message: "Xabar yuborildi!",
      });
    } catch (error) {
      res.status(400).json({
        message: "Xabar yuborishda xatolik yuz berdi!",
        error: error,
      })
    }
  }


  setNewPasswordViaEmail = async (req:Request, res: Response): Promise<void> => {
    try {
      const response =await this.authService.setNewPasswordViaEmail({
        password: req.body.password,
        userId: req.user?.id as number,
      })

      res.status(201).json({
        message: response
      })
    } catch (error) {
      console.log(error);
      throw new Error("Failed to send password to the email!")
    }
  }
}