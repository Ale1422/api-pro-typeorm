import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Equipo } from './entities/Equipo';
import { Jugada } from './entities/Jugada';
import { Partido } from './entities/Partido';
import { User } from './entities/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User, Equipo, Partido, Jugada],
    synchronize: true,
    logging: false,
})