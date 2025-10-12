import type { IUser } from "./user.types";

interface ISettingsUpdateProfile {
  email?: string;
  password?: string;
  name?: string;
  company?: string;
  role?: "user" | "admin";
  subscriptionType?: "free" | "pro" | "business";
  subscriptionExpires?: Date;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


interface IGetProfileInfoResponse {
    user: IUser
}

export type { ISettingsUpdateProfile, IGetProfileInfoResponse };
