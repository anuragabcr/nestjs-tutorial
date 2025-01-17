import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('send-mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    await this.mailerService.sendEmail(sendEmailDto);
  }
}
