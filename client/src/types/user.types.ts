interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  company?: string;
  role: "user" | "admin";
  subscriptionType: "free" | "pro" | "business";
  subscriptionExpires?: Date;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type {IUser}