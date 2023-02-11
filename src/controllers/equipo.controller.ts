import { Request, Response } from 'express';
import {Equipo} from '../entities/Equipo';
import resError from '../utils/resError';

export const createTeam = async (req: Request, res: Response) =>{
    try {
        const {nombre, grupo} = req.body;
        const dbTeam = await Equipo.findOneBy({nombre, grupo})

        console.log(dbTeam);
        if(dbTeam)  return res.status(400).send("ya existe el equipo");

        const team = new Equipo();
        team.nombre = nombre;
        team.grupo = grupo;
        await team.save();
        res.json(team);
    } catch (error) {
        resError(error, res);
    }
}