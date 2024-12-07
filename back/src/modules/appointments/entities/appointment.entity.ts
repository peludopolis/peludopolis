import { ServicesCatalog } from 'src/modules/services-catalog/entities/services-catalog.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  namePet: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'date' })
  createdAt: string;

  @Column({ type: 'date' })
  updatedAt: string;

  // @ManyToOne(() => User, (user) => user.appointments)
  // user: User;

  @ManyToMany(() => ServicesCatalog)
  @JoinTable()
  services: ServicesCatalog[];

  @Column({ default: 'pending' })
  status: string;

  //OneToOne(() => PaymentDetail)
  // paymentDetail: PaymentDetail;
}
