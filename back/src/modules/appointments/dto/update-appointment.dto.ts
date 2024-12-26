import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceAppointmentDto } from './service-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiPropertyOptional({
    description: 'Fecha de la cita. Puede ser actualizada.',
    example: '2024-12-31T10:00:00Z'
  })
  date?: Date;

  @ApiPropertyOptional({
    description: 'Nombre de la mascota. Puede ser actualizado.',
    example: 'Peludito'
  })
  namePet?: string;

  @ApiPropertyOptional({
    description: 'Hora de inicio de la cita. Puede ser actualizada.',
    example: '10:30'
  })
  startTime?: string;

  @ApiPropertyOptional({
    description: 'Servicios asociados a la cita. Puede ser actualizado.',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851']
  })
  services?: ServiceAppointmentDto[];

  @ApiPropertyOptional({
    description: 'ID del pago asociado a la cita. Puede ser actualizado.',
    example: '1ab23cd4-5678-90ef-gh12-ijklmn345opq'
  })
  payment_id?: string;
}
