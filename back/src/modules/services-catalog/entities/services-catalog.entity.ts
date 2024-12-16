import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AnimalType {
  GATO = 'gato',
  PERRO = 'perro',
}

export enum ServiceCategory {
  CONSULTA = 'Consulta veterinaria',
  CORTEDEPELO = 'Corte de pelo',
  BAÑO = 'Baño',
  CORTEUÑAS = 'Corte de uñas',
  SPA = 'Spa',
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

  @Column({
    type: 'enum',
    enum: AnimalType,
  })
  type: AnimalType;

  @Column({
    type: 'enum',
    enum: ServiceCategory,
  })
  category: ServiceCategory;
}
