import { Request, Response } from 'express';
import {Equipo} from '../entities/Equipo';
import resError from '../utils/resError';

export const createTeam = async (req: Request, res: Response) =>{
    try {
        if(!req.userIsAdmin) throw new Error("No autorizado");

        const {nombre, grupo} = req.body;
        const dbTeam = await Equipo.findOneBy({nombre, grupo})

        if(dbTeam)  throw new Error("Ya existe el equipo");

        const team = new Equipo();
        team.nombre = nombre;
        team.grupo = grupo;
        await team.save();
        res.json(team);
    } catch (error) {
        resError(error, res);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const teams = await Equipo.find();
        res.json(teams)
    } catch (error) {
        resError(error,res);
    }
}