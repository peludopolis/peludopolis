import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePaymentStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
