import { z } from "zod";

export const partidoSchema = z.object({
    body: z.object({
        local: z.number(),
        visitante: z.number(),
        fecha: z.coerce.date(),
        fase: z.enum(['GRUPO', 'OCTAVOS', 'CUARTOS', 'SEMI', 'FINAL'])        
    })
})