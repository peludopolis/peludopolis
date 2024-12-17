import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";


@Entity('services_catalog')
export class ServicesCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 50 })
  employee: string;

  @OneToMany(() => Payment, (payment) => payment.ServicesCatalog)
  payments: Payment[];

  // @OneToMany(() => Post, (post) => post.service)
  // posts: Post[];
}
