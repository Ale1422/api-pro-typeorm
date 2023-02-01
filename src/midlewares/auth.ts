import {Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY: Secret = process.env.SECRET ? process.env.SECRET : 'default';