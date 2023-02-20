import { z } from "zod";

export const NuevoPartidoSchema = z.object({
    body: z.object({
        local: z.number(),
        visitante: z.number(),
        fecha: z.coerce.date(),
        fase: z.enum(['GRUPO', 'OCTAVOS', 'CUARTOS', 'SEMI', 'FINAL'])        
    })
})

export const ActualizarPartidoSchema = z.object({
    body: z.object({
        id: z.number(), 
        resultadoLocal: z.number(), 
        resultadoVisitante: z.number(), 
        resultado: z.enum(['LOCAL', 'VISITANTE', 'EMPATE'])
    })
})