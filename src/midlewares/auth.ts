import jwt,{JwtPayload, Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

export const SECRET_KEY: Secret = process.env.SECRET ? process.env.SECRET : 'default';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new Error("Please authenticate");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    if(error instanceof Error){
        res.status(500).json({error});
    }
  }
};