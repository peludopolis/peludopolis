import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTipDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;
}
