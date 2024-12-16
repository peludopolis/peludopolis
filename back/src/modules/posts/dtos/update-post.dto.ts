import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
