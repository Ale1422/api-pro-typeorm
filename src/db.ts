import { DataSource } from 'typeorm';
import { Equipo } from './entities/Equipo';
import { Jugada } from './entities/Jugada';
import { Partido } from './entities/Partido';
import { User } from './entities/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "prode1",
    entities: [User, Equipo, Partido, Jugada],
    synchronize: true,
    logging: false,
})