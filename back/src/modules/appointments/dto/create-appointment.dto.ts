import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  ValidateNested
} from 'class-validator';
import { ServiceAppointmentDto } from './service-appointment.dto';
import { ApiProperty } from '@nestjs/swagger';
// import { StatusAppointment } from '../enum/status-appointment.enum';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Fecha de la cita en formato ISO (YYYY-MM-DD)',
    example: '2024-01-15'
  })
  @IsNotEmpty({ message: 'El parámetro "date" es obligatorio.' })
  @IsDateString(
    {},
    { message: 'El parámetro "date" debe tener el formato ISO (YYYY-MM-DD).' }
  )
  date: Date;

  @ApiProperty({
    description: 'Nombre de la mascota',
    example: 'Firulais'
  })
  @IsNotEmpty({
    message: 'El parámetro "Nombre de la Mascota" es obligatorio.'
  })
  @IsString()
  namePet: string;

  @ApiProperty({
    description:
      'Hora de inicio en formato 24 horas (HH:mm), en bloques de 30 minutos',
    example: '14:30'
  })
  @Matches(/^([01]\d|2[0-3]):([03]0)$/, {
    message:
      'El campo "startTime" debe estar en formato 24 horas y tener la estructura HH:mm, en bloques de 30 minutos'
  })
  startTime: string;

  @ApiProperty({
    description: 'ID del usuario que realiza la cita',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
  })
  @IsUUID('4', {
    message: 'El campo "user" debe ser un UUID válido en su versión 4.'
  })
  @IsNotEmpty({ message: 'El campo "user" es obligatorio.' })
  user: string;

  @ApiProperty({
    description: 'Lista de servicios solicitados',
    type: [ServiceAppointmentDto]
  })
  @IsNotEmpty({ message: 'El campo "Servicio" no puede estar vacío.' })
  @IsArray({ message: 'El campo "Servicio" debe ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => ServiceAppointmentDto)
  services: ServiceAppointmentDto[];

  @ApiProperty({
    description: 'ID del pago asociado a la cita',
    example: '7a198f2e-8d70-41a7-a40f-5b29c5f72ef5'
  })
  @IsUUID('4', {
    message: 'El campo "payment_id" debe ser un UUID válido en su versión 4.'
  })
  @IsNotEmpty({ message: 'El campo "payment_id" es obligatorio.' })
  payment_id: string;

  //OneToOne(() => PaymentDetail)
  // paymentDetail: PaymentDetail;
}
