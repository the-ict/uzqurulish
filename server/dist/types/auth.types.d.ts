import { IUser } from './user.types';
export type IUserResponse = Omit<IUser, 'password'>;
export interface IRegisterInput {
    email: string;
    password: string;
    name: string;
    company?: string;
}
export interface ILoginInput {
    email: string;
    password: string;
}
export interface IAuthResponse {
    user: IUserResponse;
    accessToken: string;
    refreshToken: string;
}
export interface IPayload {
    id: number;
    email: string;
    role: string;
}
//# sourceMappingURL=auth.types.d.ts.map