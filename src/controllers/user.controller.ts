import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IPayload, SECRET_KEY } from '../middlewares/auth.middleware';
import { LoginSchemaType, RegisterSchemaType } from '../schemas/user.schema';
import resError from '../utils/resError';

export const registerUser = async (
  req: Request<unknown, unknown, RegisterSchemaType>,
  res: Response
) => {
  try {
    const { name, lastName, email, password } = req.body;

    const userExist = await User.findOneBy({ email });

    if (userExist) {
      throw new Error("Email ya registrado");
    } else {
      const user = new User();
      user.name = name;
      user.lastName = lastName;
      user.email = email;
      user.passwordHash = await bcrypt.hash(password, 10);

      await user.save();
      res.json(user);
    }
  } catch (error) {
    resError(error, res);
  }
};

export const loginUser = async (
  req: Request<unknown, unknown, LoginSchemaType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneBy({ email });

    if(!user) throw new Error("No existe el usuario");

    let passOk: boolean = await bcrypt.compare(password, user?.passwordHash);

    if (!passOk) throw new Error("Contraseña invalida");
    
    const userToken: IPayload = {
      id: user?.id,
      isAdmin: user?.isAdmin
    };
    const token = jwt.sign(userToken, SECRET_KEY);
    res.header("auth-token", token).json(user?.name);
  } catch (error) {
    resError(error, res);
  }
};

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
      resError(error, res);
    }
}

export const setUserAdmin = async (req: Request , res: Response) => {
    try {
        const user = await User.update({id:req.idUser},{
          isAdmin: true,
          upadatedAt: new Date()
        });
        res.send(user)
    } catch (error) {        
      resError(error, res);
    }
}

/*
    https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
    https://www.youtube.com/watch?v=DpoKXjuWKwE&list=PLdOotbFwzDIiU4Hs8ySZr-phOeGMBY_3D&index=1
*/