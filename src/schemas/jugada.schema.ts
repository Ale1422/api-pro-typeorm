import {z} from 'zod'

export const JugadaSchema = z.object({
    body: z.object({
        partidoId: z.number(),
        reultadoLocal: z.number(),
        resultadoVisitante: z.number()
    })
})