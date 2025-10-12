import { Request, Response, NextFunction } from "express";
import User from "../models/User";

class PaymentMiddleware {
    async checkToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({ message: "Token not found" });
        next();
    }
}


export default PaymentMiddleware;