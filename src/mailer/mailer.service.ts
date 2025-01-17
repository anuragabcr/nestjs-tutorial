import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get<string>('USERNAME'),
        pass: configService.get<string>('PASSWORD'),
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const mailOptions: nodemailer.Options = {
      from: sendEmailDto.from,
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
      html: sendEmailDto.html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { msg: 'Email sent successfully', status: 'success' };
    } catch (error) {
      return { msg: 'Error sending email', status: 'error', error };
      throw error;
    }
  }
}
