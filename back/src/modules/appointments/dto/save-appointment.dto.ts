import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { ServicesCatalog } from 'src/modules/services-catalog/entities/services-catalog.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class SaveAppointment {
  @ApiProperty({
    description: 'Fecha de la cita en formato ISO (YYYY-MM-DD)',
    example: '2024-01-15'
  })
  @IsNotEmpty({ message: 'El campo "date" es obligatorio.' })
  @IsDateString(
    {},
    { message: 'El campo "date" debe tener un formato ISO válido.' }
  )
  date: Date;

  @ApiProperty({
    description: 'Nombre de la mascota asociada a la cita',
    example: 'Bobby'
  })
  @IsNotEmpty({ message: 'El campo "namePet" es obligatorio.' })
  @IsString({ message: 'El campo "namePet" debe ser un texto válido.' })
  namePet: string;

  @ApiProperty({
    description: 'Hora de inicio de la cita en formato HH:mm',
    example: '14:30'
  })
  @IsNotEmpty({ message: 'El campo "startTime" es obligatorio.' })
  @IsString({ message: 'El campo "startTime" debe ser un texto válido.' })
  startTime: string;

  @ApiProperty({
    description: 'Hora de fin de la cita en formato HH:mm',
    example: '15:00'
  })
  @IsNotEmpty({ message: 'El campo "endTime" es obligatorio.' })
  @IsString({ message: 'El campo "endTime" debe ser un texto válido.' })
  endTime: string;

  @ApiProperty({
    description: 'Usuario asociado a la cita',
    type: () => User
  })
  @IsNotEmpty({ message: 'El campo "user" es obligatorio.' })
  @ValidateNested()
  @Type(() => User)
  user: User;

  @ApiProperty({
    description: 'Lista de servicios asociados a la cita',
    type: () => [ServicesCatalog]
  })
  @IsNotEmpty({ message: 'El campo "services" es obligatorio.' })
  @ValidateNested({ each: true })
  @Type(() => ServicesCatalog)
  services: ServicesCatalog[];

  @ApiProperty({
    description: 'ID del pago asociado a la cita',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
  })
  @IsUUID('4', {
    message: 'El campo "payment_id" debe ser un UUID válido en su versión 4.'
  })
  @IsNotEmpty({ message: 'El campo "payment" es obligatorio.' })
  payment: Payment;

  // @ApiProperty({ description: 'Estado de la cita', example: 'confirmed' })
  // status: string; // Se comenta para pruebas
}
