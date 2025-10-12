import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUpdateUserProfile, IChangePassword } from '../types/user.types';

export class UserController {
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService();
  }
  
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const user = await this.userService.getUserProfile(userId);
      
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
      const updateData: IUpdateUserProfile = req.body;
      
      const user = await this.userService.updateUserProfile(userId, updateData);
      
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
      const passwordData: IChangePassword = req.body;
      
      await this.userService.changePassword(userId, passwordData);
      
      res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
  
  updateSubscription = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const { subscriptionType } = req.body;
      
      await this.userService.updateSubscription(userId, subscriptionType);
      
      res.status(200).json({
        message: 'Subscription updated successfully',
      });
    } catch (error:any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
}