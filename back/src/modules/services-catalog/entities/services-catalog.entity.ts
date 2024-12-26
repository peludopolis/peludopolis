import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Identificador único del servicio en el catálogo.',
    type: 'string',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del servicio.',
    type: 'string',
    example: 'Consulta veterinaria básica'
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del servicio.',
    type: 'string',
    example: 'Consulta general para evaluar el estado de salud del animal.'
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Precio del servicio.',
    type: 'number',
    format: 'decimal',
    example: 1500.0
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Nombre del empleado asignado al servicio (opcional).',
    type: 'string',
    example: 'Juan Pérez',
    required: false
  })
  @Column({ nullable: true })
  employeeName?: string;

  // @OneToMany(() => Post, (post) => post.service)
  // posts: Post[];

  @ApiProperty({
    description: 'Tipo de animal al que aplica el servicio.',
    enum: AnimalType,
    example: AnimalType.PERRO
  })
  @Column({
    type: 'enum',
    enum: AnimalType
  })
  type: AnimalType;

  @ApiProperty({
    description: 'Categoría del servicio.',
    enum: ServiceCategory,
    example: ServiceCategory.CONSULTA
  })
  @Column({
    type: 'enum',
    enum: ServiceCategory
  })
  category: ServiceCategory;

  @ApiProperty({
    description:
      'Etapa de vida del animal a la que está orientado el servicio.',
    enum: Stage,
    example: Stage.Cachorro
  })
  @Column({
    type: 'enum',
    enum: Stage
  })
  stage: Stage;

  @ApiProperty({
    description: 'Duración del servicio en minutos.',
    type: 'number',
    example: 30
  })
  @Column('int')
  duration: number;

  @ApiProperty({
    description: 'Cita asociada al servicio (relación many-to-one).',
    type: () => Appointment
  })
  @ManyToOne(() => Appointment, (appointment) => appointment.services)
  appointment: Appointment;
}
