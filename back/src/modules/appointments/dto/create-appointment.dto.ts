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
// import { StatusAppointment } from '../enum/status-appointment.enum';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'El parámetro "date" es obligatorio.' })
  @IsDateString(
    {},
    { message: 'El parámetro "date" debe tener el formato ISO (YYYY-MM-DD).' }
  )
  date: Date;

  @IsNotEmpty({
    message: 'El parámetro "Nombre de la Mascota" es obligatorio.'
  })
  @IsString()
  namePet: string;

  @Matches(/^([01]\d|2[0-3]):([03]0)$/, {
    message:
      'El campo "startTime" debe estar en formato 24 horas y tener la estructura HH:mm, en bloques de 30 minutos'
  })
  startTime: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsNotEmpty({ message: 'El campo "Servicio" no puede estar vacío.' })
  @IsArray({ message: 'El campo "Servicio" debe ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => ServiceAppointmentDto)
  services: ServiceAppointmentDto[];

  @IsNotEmpty()
  @IsUUID()
  payment_id: string;

  //OneToOne(() => PaymentDetail)
  // paymentDetail: PaymentDetail;
}
