import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentStatusDto } from './dtos/update-payment-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Handle payment webhook' })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'Error processing the webhook'
  })
  @Post('webhook')
  // async handleWebhook(@Body() paymentData: CreatePaymentDto) {
  async handleWebhook(@Body() paymentData: any) {
    try {
      console.log('ejecutandose webhook');
      const payment = await this.paymentsService.processWebhook(paymentData);
      console.log('RESPONSE: ', payment);
      return payment;
    } catch (error) {
      console.error('Error al procesar webhook:', error.message);
      throw new BadRequestException('Webhook processing failed');
    }
  }

  @ApiOperation({ summary: 'Get payment by external reference' })
  @ApiResponse({
    status: 200,
    description: 'Payment found successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found'
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching payment details'
  })
  @Get('external-reference/:reference')
  async getPaymentByExternalReference(@Param('reference') reference: string) {
    try {
      return await this.paymentsService.findByExternalReference(reference);
    } catch (error) {
      console.error(
        `Error al obtener el pago por referencia externa ${reference}:`,
        error.message
      );
      throw error;
    }
  }

  // @Post('test')
  // async test(@Body() paymentData: any) {
  //   console.log(paymentData);
  //   return 'hola';
  // }

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully'
  })
  @ApiResponse({
    status: 500,
    description: 'Error creating payment'
  })
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      console.error('Error al crear el pago:', error.message);
      throw new InternalServerErrorException('Payment creation failed');
    }
  }

  @ApiOperation({ summary: 'Get payment details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment found successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found'
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching payment details'
  })
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    try {
      const payment = await this.paymentsService.getPaymentById(id);
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error al obtener el pago:', error.message);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching payment details');
    }
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'Payments fetched successfully'
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching payments'
  })
  @Get()
  async getAllPayments() {
    try {
      return await this.paymentsService.getAllPayments();
    } catch (error) {
      console.error('Error al obtener todos los pagos:', error.message);
      throw new InternalServerErrorException('Error fetching payments');
    }
  }

  @ApiOperation({ summary: 'Update payment status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment status updated successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found'
  })
  @ApiResponse({
    status: 500,
    description: 'Error updating payment status'
  })
  @Patch(':id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto
  ) {
    try {
      const { status } = updatePaymentStatusDto;
      const updatedPayment = await this.paymentsService.updatePaymentStatus(
        id,
        status
      );
      if (!updatedPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return updatedPayment;
    } catch (error) {
      console.error('Error al actualizar el estado del pago:', error.message);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating payment status');
    }
  }
}
