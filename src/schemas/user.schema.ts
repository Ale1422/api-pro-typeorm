import {z} from 'zod';

export const RegisterSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(5),
        confirmPassword: z.string().min(5)
    })
})

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>["body"];
export type LoginSchemaType = z.infer<typeof LoginSchema>["body"];