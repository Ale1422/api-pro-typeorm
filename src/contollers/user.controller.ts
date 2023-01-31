import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
const { SECRET } = process.env;

export const createUser = async (req:Request, res:Response, next:NextFunction) =>{
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