import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  mp_id: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  serviceCatalogId?: string;

  @IsOptional()
  appointmentId?: string;
}
