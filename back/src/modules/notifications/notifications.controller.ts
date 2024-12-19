import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './notifications.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emialService: EmailService) {}

  @Post('send-payment-email')
  async sendPaymentEmail(
    @Body()
    {
      clientEmail,
      paymentAmount
    }: {
      clientEmail: string;
      paymentAmount: number;
    }
  ): Promise<string> {
    await this.emialService.sendPaymentConfirmationEmail(
      clientEmail,
      paymentAmount
    );
    return 'Correo de confirmación enviado';
  }
}
