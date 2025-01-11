import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASSWORD_APP
      }
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Error al configurar el transporte:', error);
      } else {
        console.log('Transporte configurado correctamente:', success);
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  }
}
