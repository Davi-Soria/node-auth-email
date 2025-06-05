import { z } from 'zod';

export const registerSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caractéres')
})