import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(private readonly dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  async findBasicById(id: string): Promise<Payment | null> {
    return this.findOne({ where: { id } });
  }

  async findAllWithRelations(): Promise<Payment[]> {
    return this.find({
      relations: ['user', 'appointment']
    });
  }

  async findByIdWithRelations(id: string): Promise<Payment | null> {
    return this.findOne({
      where: { id },
      relations: ['user', 'appointment']
    });
  }

  async findByMpId(mp_id: string): Promise<Payment | null> {
    return this.findOne({ where: { mp_id } });
  }
}
