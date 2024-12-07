import { IsNotEmpty, IsUUID } from 'class-validator';

export class ServiceAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string; // ID del servicio (UUID)
}
