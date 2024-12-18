import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './entities/payment.entity';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentsRepository.create(data);
    return await this.paymentsRepository.save(payment);
  }

  async processWebhook(paymentData: any) {
    const paymentId = paymentData?.data?.id;

    if (!paymentId) {
      throw new Error('Invalid payment data: missing Mercado Pago ID');
    }

    try {
      const paymentDetails =
        await this.getPaymentDetailsFromMercadoPago(paymentId);

      const {
        id: mp_id,
        status,
        payment_method_id: method,
        transaction_amount: amount
      } = paymentDetails;

      if (status !== 'approved') {
        console.log(`Pago con ID ${mp_id} no aprobado. Estado: ${status}`);
        return;
      }

      const existingPayment = await this.paymentsRepository.findByMpId(mp_id);

      if (existingPayment) {
        console.log(
          `El pago con ID ${mp_id} ya existe. No se creará nuevamente.`
        );
        return;
      }

      const payment = this.paymentsRepository.create({
        mp_id,
        status,
        method,
        amount
      });
      await this.paymentsRepository.save(payment);

      console.log(`Pago procesado exitosamente: ${mp_id}`);
      return payment;
    } catch (error) {
      console.error('Error al procesar el webhook:', error.message);
      throw new Error('Failed to process Mercado Pago webhook');
    }
  }

  private async getPaymentDetailsFromMercadoPago(
    paymentId: string
  ): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener detalles del pago desde Mercado Pago:',
        error.response?.data || error.message
      );
      throw new Error('Failed to fetch payment details from Mercado Pago');
    }
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findBasicById(id);

    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }

    payment.status = status;
    return await this.paymentsRepository.save(payment);
  }

  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentsRepository.findAllWithRelations();
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findByIdWithRelations(id);

    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }

    return payment;
  }
}