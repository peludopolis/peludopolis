import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Identificador único del pago.',
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @IsUUID('4', { message: 'El campo "id" debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El campo "id" no puede estar vacío.' })
  id: string;

  @ApiProperty({
    description: 'Monto de la transacción.',
    type: 'number',
    example: 150.75
  })
  @IsNumber(
    {},
    { message: 'El campo "transaction_amount" debe ser un número.' }
  )
  @IsNotEmpty({
    message: 'El campo "transaction_amount" no puede estar vacío.'
  })
  transaction_amount: number;

  @ApiProperty({
    description: 'Identificador del método de pago utilizado.',
    type: 'string',
    format: 'uuid',
    example: 'b1f2d4c6-3e56-4b2d-b3b6-77bbd472a129'
  })
  @IsUUID('4', {
    message: 'El campo "payment_method_id" debe ser un un UUID válido.'
  })
  @IsNotEmpty({ message: 'El campo "payment_method_id" no puede estar vacío.' })
  payment_method_id: string;

  @ApiProperty({
    description: 'Estado del pago (por ejemplo: "pendiente", "completado").',
    type: 'string',
    example: 'completado'
  })
  @IsString({ message: 'El campo "status" debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El campo "status" no puede estar vacío.' })
  status: string;

  @IsOptional()
  @IsString()
  external_reference?: string;
}
