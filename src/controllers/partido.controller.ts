import { Request, Response } from 'express';
import { Partido } from '../entities/Partido';
import resError from '../utils/resError';

export const nuevoPartido = async (req: Request, res: Response) => {
    try {
        if(!req.userIsAdmin) throw new Error("No autorizado");

        const {local, visitante, fecha, fase} = req.body;

        const partidoDb = await Partido.findOneBy({local,visitante,fase});

        if(partidoDb) throw new Error("Ya existe el partido");

        const partido = new Partido();
        partido.fecha = fecha;
        partido.local = local;
        partido.visitante = visitante;
        partido.fase = fase;
        await partido.save();

        res.json(partido)        
    } catch (error) {
        resError(error, res)
    }
}

export const actualizarPartido = async (req:Request, res:Response) => {
    try {
        if(!req.userIsAdmin) throw new Error("No autorizado");
        
    } catch (error) {
        resError(error, res);
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const partidosDb = await Partido.find({
            relations:{
                local: true,
                visitante: true
            }
        })
        res.json(partidosDb);
    } catch (error) {
        resError(error,res);
    }
}