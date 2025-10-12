export interface IUserProfile {
  id: number;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
  subscriptionType: 'free' | 'pro' | 'business';
  subscriptionExpires?: Date;
  avatarUrl?: string;
  createdAt: Date;
}

export interface IUpdateUserProfile {
  name?: string;
  company?: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
  subscriptionType: 'free' | 'pro' | 'business';
  subscriptionExpires?: Date;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}