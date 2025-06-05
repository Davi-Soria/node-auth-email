import { RequestHandler } from "express";
import { registerSchema } from "../validators/auth.schema";
import { User } from "../model/user";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "../services/email.service";

export const register: RequestHandler = async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error?.flatten() });
            return
        }

        const { email, password } = parsed.data;

        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) {
            res.status(400).json({ error: 'Email já cadastrado.'});
            return
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = new Date(Date.now() + 10 * 60 * 1000);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                isVerified: false,
                twoFactorCode: verificationCode,
                twoFactorExpires: expires,
            });

            await sendVerificationEmail(email, verificationCode);

            res.status(201).json({ message: 'Usuário registrado. Verifique seu email.'});
            
    } catch(error) { 
            res.status(500).json({error: 'Erro interno no servidor.'});        
    } 
};

export const verifyCode: RequestHandler = (req, res) => {
     res.sendStatus(501);
     return
};

export const login: RequestHandler = (req, res) => {
    res.sendStatus(501);
     return
}   