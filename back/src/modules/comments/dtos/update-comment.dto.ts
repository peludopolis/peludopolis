import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario. Este campo es opcional.',
    example: 'Este es el comentario actualizado.',
    required: false,
    minLength: 1,
    maxLength: 500
  })
  @IsOptional()
  @IsString({ message: 'El contenido debe ser una cadena de texto.' })
  @Length(1, 500, {
    message: 'El contenido del comentario debe tener entre 1 y 500 caracteres.'
  })
  content?: string;
}
