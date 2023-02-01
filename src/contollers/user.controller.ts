import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { SECRET_KEY } from '../midlewares/auth';

export const registerUser = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { name, lastName, email, password } = req.body;
        
        const userExist = await User.findOneBy({email});

        console.log(userExist);
        if(userExist){
            throw new Error('Email ya registrado');
        }else{
            const user = new User();
            user.name = name;
            user.lastName = lastName;
            user.email = email;
            user.passwordHash = await bcrypt.hash(password, 10);

            await user.save();
            res.json(user);
        }
    } catch (error) {
        if(error instanceof Error ){
            return res.status(500).json({message: error.message})
        }
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOneBy({email});

        let passOk : boolean = user ? await bcrypt.compare(password, user?.passwordHash) : false;
        
        if(!passOk) throw new Error("Usuario o contraseña invalida");
        const InfoToken = {
            id: user?.id,
            name: user?.name,
            email: user?.email
        };
        const token = jwt.sign(InfoToken, SECRET_KEY);
        res.send(token);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}

export const getUser = async (req: Request, res: Response ) => {
    try {
        const {id} = req.params;
        const user = await User.find({
            where:{id:parseInt(id)},
            select : {
                name: true,
                email: true
            }});

        res.send(user);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}

export const setUserAdmin =async (req:Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

/*
    https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
    https://www.youtube.com/watch?v=DpoKXjuWKwE&list=PLdOotbFwzDIiU4Hs8ySZr-phOeGMBY_3D&index=1
*/