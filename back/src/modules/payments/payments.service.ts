import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './entities/payment.entity';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  // Crear un nuevo registro de pago
  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentsRepository.create(data);
    return await this.paymentsRepository.save(payment);
  }

  // Procesar notificaciones de Mercado Pago vía webhook
  async processWebhook(paymentData: any): Promise<void> {
    if (!paymentData?.data?.id) {
      throw new Error('Invalid payment data: missing Mercado Pago ID');
    }

    const paymentId = paymentData.data.id;

    try {
      // Consultar detalles del pago en Mercado Pago
      const paymentDetails =
        await this.getPaymentDetailsFromMercadoPago(paymentId);

      const {
        id: mp_id,
        status,
        payment_method_id,
        transaction_amount
      } = paymentDetails;

      // Buscar el pago en la base de datos usando el mp_id
      let payment = await this.paymentsRepository.findByMercadoPagoId(mp_id);

      if (!payment) {
        // Si no existe, crearlo
        payment = this.paymentsRepository.create({
          mp_id,
          status,
          method: payment_method_id,
          amount: transaction_amount
        });
      } else {
        // Si existe, actualizar su estado
        payment.status = status;
      }

      // Guardar cambios en la base de datos
      await this.paymentsRepository.save(payment);

      console.log(
        `Pago procesado: Mercado Pago ID ${mp_id}, Estado: ${status}`
      );
    } catch (error) {
      console.error('Error processing webhook:', error.message);
      throw new Error('Failed to process Mercado Pago webhook');
    }
  }

  // Método privado para obtener detalles del pago desde Mercado Pago
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
        'Error fetching payment details from Mercado Pago:',
        error.response?.data || error.message
      );
      throw new Error('Failed to fetch payment details');
    }
  }

  // Actualizar el estado de un pago existente
  async updatePaymentStatus(id: string, status: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findBasicById(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    payment.status = status;
    return await this.paymentsRepository.save(payment);
  }

  // Obtener todos los pagos con sus relaciones
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentsRepository.findAllWithRelations();
  }

  // Obtener un pago por su ID con relaciones
  async getPaymentById(id: string): Promise<Payment> {
    return await this.paymentsRepository.findByIdWithRelations(id);
  }
}
