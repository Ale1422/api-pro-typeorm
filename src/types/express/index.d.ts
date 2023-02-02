import {Express, Request} from 'express'
import {JwtPayload} from 'jsonwebtoken'

export {}

declare global {
    namespace Express { export interface Request{
        token ? : string | JwtPayload;
    }}
}