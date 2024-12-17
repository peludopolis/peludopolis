import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { ServicesCatalog } from 'src/modules/services-catalog/entities/services-catalog.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  mp_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  method: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ServicesCatalog, (service) => service.payments, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  ServicesCatalog: ServicesCatalog;

  @ManyToOne(() => Appointment, (appointment) => appointment.payment, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  appointment: Appointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
