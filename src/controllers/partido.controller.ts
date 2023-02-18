import { Request, Response } from 'express';
import { Partido } from '../entities/Partido';
import resError from '../utils/resError';

export const nuevoPartido = async (req: Request, res: Response) => {
    try {
        if(!req.userIsAdmin) throw new Error("No autorizado");

        const {local, visitante, fecha, fase} = req.body;

        const partidoDb = await Partido.findOne({
          relations: {
            visitante: true,
            local: true,
          },
          where: {
            local: {
              id: local,
            },
            visitante: {
              id: visitante,
            },
            fase,
          },
        });

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

        const {id, resultadoLocal, resultadoVisitante, resultado} = req.body;
        
        const partido = await Partido.update({id},{
            resultadoLocal,
            resultadoVisitante,
            resultado, 
            checkFlag: true
        });

        if(!partido.affected) throw new Error("No se actualizo ningun partido");
        res.json({message:"Actualizado"})          
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