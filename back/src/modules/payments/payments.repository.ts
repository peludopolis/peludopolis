import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(private readonly dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  // Buscar un pago básico por ID
  async findBasicById(id: string): Promise<Payment | null> {
    return this.findOne({ where: { id } });
  }

  // Buscar todos los pagos con relaciones
  async findAllWithRelations(): Promise<Payment[]> {
    return this.find({
      relations: ['user', 'ServicesCatalog', 'appointment']
    });
  }

  // Buscar un pago por ID con relaciones
  async findByIdWithRelations(id: string): Promise<Payment | null> {
    return this.findOne({
      where: { id },
      relations: ['user', 'ServicesCatalog', 'appointment']
    });
  }

  // Buscar un pago por ID de Mercado Pago
  async findByMercadoPagoId(mp_id: string): Promise<Payment | null> {
    return this.findOne({ where: { mp_id } });
  }
}
