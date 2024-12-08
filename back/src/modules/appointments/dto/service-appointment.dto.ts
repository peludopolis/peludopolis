import { IsNotEmpty, IsUUID } from 'class-validator';

export class ServiceAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
