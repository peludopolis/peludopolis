import { ServicesCatalog } from 'src/modules/services-catalog/entities/services-catalog.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToOne,
  OneToMany
} from 'typeorm';
import { StatusAppointment } from '../enum/status-appointment.enum';
import { PaymentsDetail } from './paymentsDetail.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  namePet: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @OneToMany(() => ServicesCatalog, (service) => service.appointment, {
    cascade: true
  })
  @JoinTable()
  services: ServicesCatalog[];

  // Para probar se cambió a confirmed
  @Column({
    type: 'enum',
    enum: StatusAppointment,
    default: StatusAppointment.Confirmed
  })
  status: StatusAppointment;

  @OneToOne(() => PaymentsDetail, (paymentDetail) => paymentDetail.appointment)
  paymentDetail: PaymentsDetail;
}
