import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTipDto {
  @ApiProperty({
    description: 'Título del consejo.',
    type: 'string',
    example: 'Cómo cuidar a tu perro en verano',
    minLength: 5,
    maxLength: 100
  })
  @IsNotEmpty({ message: 'El campo "title" no puede estar vacío.' })
  @IsString({ message: 'El campo "title" debe ser una cadena de texto.' })
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres.' })
  @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres.' })
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del consejo.',
    type: 'string',
    example:
      'Asegúrate de mantener a tu perro hidratado durante los días calurosos, proporcionando agua fresca y sombra.',
    minLength: 20,
    maxLength: 500
  })
  @IsNotEmpty({ message: 'El campo "description" no puede estar vacío.' })
  @IsString({ message: 'El campo "description" debe ser una cadena de texto.' })
  @MinLength(20, {
    message: 'La descripción debe tener al menos 20 caracteres.'
  })
  @MaxLength(500, {
    message: 'La descripción no puede exceder los 500 caracteres.'
  })
  description: string;
}
