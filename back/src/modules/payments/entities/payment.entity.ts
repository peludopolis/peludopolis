import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  mp_id: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  payment_method_id: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @OneToOne(() => Appointment, (appointment) => appointment.payment, {
    onDelete: 'CASCADE'
  })
  appointment: Appointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  user: any;
}
