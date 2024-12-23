import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ServiceAppointmentDto {
  @ApiProperty({
    description: 'Identificador único del servicio asociado a la cita',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
  })
  @IsNotEmpty({ message: 'El parámetro "id" es obligatorio.' })
  @IsUUID('4', {
    message: 'El parámetro "id" debe ser un UUID válido en su versión 4.'
  })
  id: string;
}
