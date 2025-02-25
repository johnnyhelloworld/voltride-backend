/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: 'gmail',
      auth: {
        user: 'johnny92300@gmail.com',
        pass: 'xlsv ords evge zjzl',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }

  async notifyLowStock(partName: string, quantity: number): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'johnny92300@gmail.com',
      subject: '⚠️ Alerte Stock Faible',
      text: `Le stock de "${partName}" est faible. Quantité restante : ${quantity}. Veuillez réapprovisionner rapidement.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(
        `Email envoyé pour ${partName} (stock restant : ${quantity})`,
      );
    } catch (error) {
      console.error('Erreur lors de l’envoi du mail:', error);
    }
  }
}
