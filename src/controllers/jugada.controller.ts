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
    
    const jugadas = await Jugada.find({
      select:{
        user:{
          puntaje: true
        }
      },
      relations:{
        partido: true,
        user:true
      },
      where: {
        check: false,
        partido:{
          checkFlag: false
        }
      }
    })

    if(!jugadas.length) throw new Error("No hay jugadas por chequear");

    
    //res.json(jugadas)
    
    for ( const item of jugadas){
      let punt: number;
      switch(item.partido.resultado){
        case "LOCAL":
            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) punt = 5;    
            else if(item.resultadoLocal > item.resultadoVisitante) punt = 3;
            else punt = 0
            break;
        case "VISITANTE":
            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) punt = 5;    
            else if(item.resultadoLocal < item.resultadoVisitante) punt = 3;
            else punt = 0
            break;
        case "EMPATE":
            if(item.resultadoLocal === item.partido.resultadoLocal && item.resultadoVisitante === item.partido.resultadoVisitante) punt = 5;    
            else if(item.resultadoLocal === item.resultadoVisitante) punt = 3;
            else punt = 0
            break;
        default:
            punt = 0
            break;
      }
      
      await User.update({ id: item.userId }, {
        puntaje: item.user.puntaje + punt,
        upadatedAt: new Date()
      })

      await Jugada.update({id:item.id},{
        check: true,
        upadatedAt: new Date()
      })

      res.status(200).send()
    }

  } catch (error) {
    resError(error,res);
  }
};