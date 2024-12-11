import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT, 10), 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendPaymentConfirmationEmail(clientEmail: string, paymentAmount: number): Promise<void> {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: clientEmail,
            subject: 'Confirmación de pago',
            text: `Se ha recibido el pago de ${paymentAmount} por tu turno. ¡Gracias!`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Correo de confirmación enviado');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    }
}