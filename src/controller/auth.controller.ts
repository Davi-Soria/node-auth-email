import { RequestHandler } from "express";
import { registerSchema, verifyCodeSchema, loginSchema } from "../validators/auth.schema";
import { User } from "../model/user";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "../services/email.service";
import jwt from "jsonwebtoken";

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

export const verifyCode: RequestHandler = async (req, res) => {
     try{
        const parsed = verifyCodeSchema.safeParse(req.body)

        if(!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten()});
            return
        }

        const { email, code }  = parsed.data;

        const user = await User.findOne({ where: { email }});

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado.'});
            return
        }

        if (user.isVerified) {
            res.status(400).json({ error: 'Usuário já verificado.'});
            return
        }

        user.isVerified = true;
        user.twoFactorCode = null;
        user.twoFactorExpires = null;
        await user.save();

        res.json({ message: 'Email verificado com sucesso!'})
        return
     } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno no servidor.'})
     }
     
};

export const login: RequestHandler = async (req, res) => {
    try{
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return
        }

        const { email, password } = parsed.data;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado.'});
            return
        }
            

        if(!user.isVerified) {
            res.status(403).json({ error: 'Senha incorreta.'});
            return
        }
           

        const passwordMatch = await bcrypt.compare( password, user.password );
        if (!passwordMatch) {
            res.status(401).json({ error: 'Senha incorreta.'});
            return
        };

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET || 'jwtsecret', {
            expiresIn: '1h',
        });

        res.json({ message: 'Login bem sucedido', token });
        return
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno no servidor.'})
    }
}   