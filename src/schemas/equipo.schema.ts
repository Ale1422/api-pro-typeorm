import {z} from 'zod';

export const EquipoSchema = z.object ({
    body: z.object({
        nombre: z.string().min(1),
        grupo: z.enum(["A","B","C","D","E","F","G","H"])
    })
})