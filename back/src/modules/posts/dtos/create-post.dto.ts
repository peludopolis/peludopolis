import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título del post.',
    example: 'Mi primer post'
  })
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El título no puede exceder los 255 caracteres.' })
  title: string;

  @ApiProperty({
    description: 'Descripción del post.',
    example: 'Este es un post de ejemplo con información relevante.'
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @MaxLength(500, {
    message: 'La descripción no puede exceder los 500 caracteres.'
  })
  description: string;

  @ApiProperty({
    description: 'URL de la imagen del post (opcional).',
    example: 'https://example.com/imagen.jpg',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  image?: string;

  @ApiProperty({
    description: 'ID del usuario que crea el post (UUID).',
    example: '29bd6879-16eb-4cd5-b071-633b1959f932'
  })
  @IsNotEmpty({ message: 'El campo "userId" no puede estar vacío.' })
  @IsUUID('4', {
    message: 'El campo "userId" debe ser un UUID válido en su versión 4.'
  })
  userId: string;
}
