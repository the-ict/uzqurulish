import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    message: 'Route not found',
  });
};