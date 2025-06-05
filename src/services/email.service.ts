import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email:string, code: string) => {
    await transporter.sendMail({
        from: '"App Auth" <no-reply@app.com',
        to: email,
        subject: 'Código de verificação',
        text: `Seu código de verificação é: ${code}`,
    })
}