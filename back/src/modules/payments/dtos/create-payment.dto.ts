import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Identificador único del pago.',
    type: 'string',
    example: '98936807634-001'
  })
  @IsNotEmpty({ message: 'El campo "id" no puede estar vacío.' })
  @IsString({ message: 'El campo "id" debe ser una cadena de texto.' })
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
    example: 'account money'
  })
  @IsString({
    message: 'El campo "payment_method_id" debe ser una cadena de texto.'
  })
  @IsNotEmpty({ message: 'El campo "payment_method_id" no puede estar vacío.' })
  payment_method_id: string;

  @ApiProperty({
    description: 'Estado del pago (por ejemplo: "success", "rejected").',
    type: 'string',
    example: 'success'
  })
  @IsString({ message: 'El campo "status" debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El campo "status" no puede estar vacío.' })
  status: string;

  @ApiProperty({
    description: 'Referencia externa definida por el sistema.',
    type: 'string',
    example: 'user-12345'
  })
  @IsOptional()
  @IsString({
    message: 'El campo "external_reference" debe ser una cadena de texto.'
  })
  external_reference?: string;
}
