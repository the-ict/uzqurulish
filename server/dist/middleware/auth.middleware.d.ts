import { Request, Response, NextFunction } from 'express';
import { IPayload } from '../types/auth.types';
interface AuthRequest extends Request {
    user?: IPayload;
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map