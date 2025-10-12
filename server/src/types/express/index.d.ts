import { IPayload } from '../auth.types';

declare global {
  namespace Express {
    export interface Request {
      user?: IPayload;
    }
  }
}
export {}