import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Equipo } from './entities/Equipo';
import { Jugada } from './entities/Jugada';
import { Partido } from './entities/Partido';
import { User } from './entities/User'

const PORT_DB: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: PORT_DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User, Equipo, Partido, Jugada],
    synchronize: true,
    logging: false,
})