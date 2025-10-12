import { Model, Optional } from 'sequelize';
import { IUser } from '../types/user.types';
interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class User extends Model<IUser, UserCreationAttributes> implements IUser {
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
    static associate(models: any): void;
}
export default User;
//# sourceMappingURL=User.d.ts.map