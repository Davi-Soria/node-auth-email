import { z } from 'zod';

export const registerSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caractéres')
});

export const verifyCodeSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, 'O código deve ter 6 digitos.')
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})