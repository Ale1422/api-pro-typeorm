import jwt,{JwtPayload, Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

export const SECRET_KEY: Secret = process.env.SECRET ? process.env.SECRET : 'default';

export interface IPayload{
  id: number;
  isAdmin: boolean;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
        throw new Error("Please authenticate");
    }
    const payload = jwt.verify(token, SECRET_KEY) as IPayload;
    req.idUser = payload.id;
    req.userIsAdmin = payload.isAdmin

    next();
  } catch (error) {
    if(error instanceof Error){
        res.status(500).json({message: error.message});
    }
  }
};

// export const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         throw new Error("Please authenticate");
//     }
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.token = decoded;

//     next();
//   } catch (error) {
//     if(error instanceof Error){
//         res.status(500).json({message: error.message});
//     }
//   }
// };