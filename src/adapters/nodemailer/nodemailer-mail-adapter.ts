import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4eed7a513f343b",
    pass: "7b0767b9d9f33a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data;
    
    await transport.sendMail({
      from: 'Equipe Feedget <teste@feedget.com>',
      to: 'Lucas Moraes <lucmoraes27@hotmail.com>',
      subject: subject,
      html: body,
    });
  };
}