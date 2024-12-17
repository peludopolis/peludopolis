import { Controller, Get, Post, Body, Param, Patch, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentStatusDto } from './dtos/update-payment-status.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.createPayment(createPaymentDto);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: any): Promise<void> {
    const paymentData = req.body;
    await this.paymentsService.processWebhook(paymentData);
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

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return await this.paymentsService.getPaymentById(id);
  }
}
