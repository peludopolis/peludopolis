import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

export enum Stage {
  Cachorro = 'Cachorro',
  Adulto = 'Adulto'
}

@Entity('services_catalog')
export class ServicesCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  employeeName?: string;

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

  @Column({
    type: 'enum',
    enum: Stage
  })
  stage: Stage;

  @Column('int')
  duration: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.services)
  appointment: Appointment;
}
