import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../types/auth.types';
import config from '../config';

interface AuthRequest extends Request {
  user?: IPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user as IPayload;
    next();
  });
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!roles.includes((req.user as any).role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
};