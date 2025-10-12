import User from '../models/User';
import { IUserProfile, IUpdateUserProfile, IChangePassword } from '../types/user.types';
import { hashPassword, comparePassword } from '../utils/password.util';

export class UserService {
  async getUserProfile(id: number): Promise<IUserProfile> {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user.toJSON();
  }
  
  async updateUserProfile(
    id: number,
    updateData: IUpdateUserProfile
  ): Promise<IUserProfile> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    await user.update(updateData);
    
    return user.toJSON();
  }
  
  async changePassword(
    id: number,
    passwordData: IChangePassword
  ): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const { currentPassword, newPassword } = passwordData;
    
    // Check current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }
    
    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update password
    await user.update({ password: hashedNewPassword });
  }
  
  async updateSubscription(
    id: number,
    subscriptionType: 'free' | 'pro' | 'business'
  ): Promise<void> {
    const user = await User.findByPk(id);
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