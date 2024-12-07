import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
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
  date: string;

  @IsNotEmpty()
  @IsString()
  namePet: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message:
      'El campo "startTime" debe estar en formato 24 horas y tener la estructura HH:mm',
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

  // @IsNotEmpty()
  // @IsEnum(StatusAppointment)
  // status: StatusAppointment;

  //OneToOne(() => PaymentDetail)
  // paymentDetail: PaymentDetail;
}
