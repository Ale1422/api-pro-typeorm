import { Response } from "express";

export default (error : any, res : Response) =>{
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
}