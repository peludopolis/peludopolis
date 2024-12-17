import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Post } from '../../posts/entities/post.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';

export enum AnimalType {
  GATO = 'gato',
  PERRO = 'perro'
}

export enum ServiceCategory {
  CONSULTA = 'Consulta veterinaria',
  CORTEDEPELO = 'Corte de pelo',
  BAÑO = 'Baño',
  CORTEUÑAS = 'Corte de uñas',
  SPA = 'Spa'
}

@Entity('services_catalog')
export class ServicesCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  duration: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 100, nullable: true })
  employeeName: string;

  @OneToMany(() => Payment, (payment) => payment.ServicesCatalog)
  payments: Payment[];

  // @OneToMany(() => Post, (post) => post.service)
  // posts: Post[];

  @Column({
    type: 'enum',
    enum: AnimalType
  })
  type: AnimalType;

  @Column({
    type: 'enum',
    enum: ServiceCategory
  })
  category: ServiceCategory;
}
