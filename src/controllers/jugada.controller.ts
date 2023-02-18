import { Request, Response } from 'express'
import { Jugada } from '../entities/Jugada';
import { Partido } from '../entities/Partido';
import {User} from '../entities/User'
import resError from '../utils/resError';

export const crearJugada = async (req: Request, res: Response) => {
  try {
    if(!req.idUser) throw new Error('No autorizado');

    const {partidoId, resultadoLocal, resultadoVisitante} = req.body;
    const ahoraMas2Horas = new Date( new Date().getTime() + 2*(60*60000));

    const partido = await Partido.findOneBy({id: partidoId});
    
    if(!partido) throw new Error('No existe el partido');

    if(ahoraMas2Horas > partido.fecha) throw new Error('Jugada fuera de tiempo');

    const jugada = await Jugada.findOne({
        where:{
            partidoId,
            userId: req.idUser
        }
    })

    if(jugada) throw new Error('Jugada ya existente');

    const nuevaJugada = new Jugada();

    nuevaJugada.partidoId = partidoId;
    nuevaJugada.userId = req.idUser;
    nuevaJugada.resultadoLocal = resultadoLocal;
    nuevaJugada.resultadoVisitante = resultadoVisitante;
    
     await nuevaJugada.save();

     res.json(nuevaJugada);
  } catch (error) {
    resError(error, res);
  }  
};

export const jugadasUsuario = async (req: Request, res : Response) => {
  try {
    const jugadas = await Jugada.find({where:{
      userId: req.idUser
    }})

    res.json(jugadas);
  } catch (error) {
      resError(error, res);
  }
};

export const checkearJugadas = async (req: Request, res: Response) => {
  try {
    if(!req.userIsAdmin) throw new Error("No autorizado");
    
    // const jugadas = await Jugada.find({
    //   relations:{
    //     partido: true
    //   },
    //   where: {
    //     check: false,
    //     partido:{
    //       checkFlag: false
    //     }
    //   }
    // })

    const partidos = await Partido.find({
      relations:{
        jugadas: true
      }
    })

    console.log(partidos)

    //console.log(jugadas)

    //res.json({partidos, jugadas})

    // if(!jugadas) throw new Error("No hay jugadas por chequear");
    
    // for ( const item of jugadas){
    //   let puntaje: number;
      
    // }

  } catch (error) {
    console.log(error)
  }
};