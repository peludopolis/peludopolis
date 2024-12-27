import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(private readonly dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  async findBasicById(id: string): Promise<Payment | null> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      console.error('Error al obtener el pago básico por ID:', error.message);
      throw new InternalServerErrorException('Error al obtener el pago por ID');
    }
  }

  async findAllWithRelations(): Promise<Payment[]> {
    try {
      return await this.find({
        relations: ['user', 'appointment']
      });
    } catch (error) {
      console.error(
        'Error al obtener todos los pagos con relaciones:',
        error.message
      );
      throw new InternalServerErrorException('Error al obtener los pagos');
    }
  }

  async findByIdWithRelations(id: string): Promise<Payment | null> {
    try {
      return await this.findOne({
        where: { id },
        relations: ['user', 'appointment']
      });
    } catch (error) {
      console.error(
        'Error al obtener el pago por ID con relaciones:',
        error.message
      );
      throw new InternalServerErrorException(
        'Error al obtener el pago con relaciones'
      );
    }
  }

  async findByMpId(mp_id: string): Promise<Payment | null> {
    try {
      return this.findOne({ where: { mp_id } });
    } catch (error) {
      console.error(
        'Error al obtener el pago por ID de Mercado Pago:',
        error.message
      );
      throw new InternalServerErrorException(
        'Error al obtener el pago por MP ID'
      );
    }
  }
}
