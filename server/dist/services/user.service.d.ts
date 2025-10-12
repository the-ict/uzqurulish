import { IUserProfile, IUpdateUserProfile, IChangePassword } from '../types/user.types';
export declare class UserService {
    getUserProfile(id: number): Promise<IUserProfile>;
    updateUserProfile(id: number, updateData: IUpdateUserProfile): Promise<IUserProfile>;
    changePassword(id: number, passwordData: IChangePassword): Promise<void>;
    updateSubscription(id: number, subscriptionType: 'free' | 'pro' | 'business'): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map