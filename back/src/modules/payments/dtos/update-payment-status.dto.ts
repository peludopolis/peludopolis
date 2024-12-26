import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ApiProperty({
    description:
      'Nuevo estado del pago (por ejemplo: "pendiente", "completado", "fallido").',
    type: 'string',
    example: 'completado'
  })
  @IsString({ message: 'El campo "status" debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El campo "status" no puede estar vacío.' })
  status: string;
}
