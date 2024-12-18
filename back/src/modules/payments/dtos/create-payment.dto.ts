import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsString()
  @IsNotEmpty()
  payment_method_id: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
