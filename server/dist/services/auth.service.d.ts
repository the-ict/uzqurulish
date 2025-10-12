import { IUserResponse, IRegisterInput, ILoginInput } from "../types/auth.types";
export declare class AuthService {
    register(userData: IRegisterInput): Promise<IUserResponse>;
    login(loginData: ILoginInput): Promise<{
        user: IUserResponse;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<string>;
    getUserById(id: number): Promise<IUserResponse>;
    updateUserProfile(id: number, updateData: Partial<Omit<IUserResponse, "id" | "role" | "createdAt" | "updatedAt">>): Promise<IUserResponse>;
    changePassword(id: number, currentPassword: string, newPassword: string): Promise<void>;
    setNewPasswordViaEmail(data: {
        password: string;
        userId: string | number;
    }): Promise<string>;
}
//# sourceMappingURL=auth.service.d.ts.map