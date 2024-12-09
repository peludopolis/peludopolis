import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ServiceAppointmentDto } from './service-appointment.dto';
import { StatusAppointment } from '../enum/status-appointment.enum';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  namePet: string;

  @Matches(/^([01]\d|2[0-3]):([03]0)$/, {
    message:
      'El campo "startTime" debe estar en formato 24 horas y tener la estructura HH:mm, en bloques de 30 minutos',
  })
  startTime: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceAppointmentDto)
  services: ServiceAppointmentDto[];

  //OneToOne(() => PaymentDetail)
  // paymentDetail: PaymentDetail;
}
