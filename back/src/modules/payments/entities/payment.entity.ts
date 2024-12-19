import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  mp_id: string; // ID de Mercado Pago

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  method: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => Appointment, (appointment) => appointment.payment, {
    onDelete: 'CASCADE'
  })
  appointment: Appointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
