import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  BadRequestException
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentStatusDto } from './dtos/update-payment-status.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  async handleWebhook(@Body() paymentData: CreatePaymentDto) {
    try {
      const payment = await this.paymentsService.processWebhook(paymentData);
      return payment;
    } catch (error) {
      console.error('Error al procesar webhook:', error.message);
      throw new BadRequestException('Webhook processing failed');
    }
  }

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.createPayment(createPaymentDto);
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return await this.paymentsService.getPaymentById(id);
  }

  @Patch(':id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto
  ) {
    const { status } = updatePaymentStatusDto;
    return await this.paymentsService.updatePaymentStatus(id, status);
  }

  @Get()
  async getAllPayments() {
    return await this.paymentsService.getAllPayments();
  }
}
