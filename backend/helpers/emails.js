import nodemailer from 'nodemailer';

export const registerEmail = async (data) => {

    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Project administrator" <accounts@uptask.com>',
        to: email,
        subject: "UpTask - Confirm your account",
        text: "Confirm your account in UpTask",
        html: `
            <p>Hi ${name}! To start using UpTask you need to confirm your account.</p>
            <p>Click the following link.</p>
            <a href="${process.env.WHITELISTED_URL}/confirm/${token}">Confirm account</a>
            <p>If you didn't request this, you can just ignore this email.</p>
        `,
    })
}