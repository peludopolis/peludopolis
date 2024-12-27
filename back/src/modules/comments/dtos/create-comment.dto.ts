import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario.',
    example: 'Este es un comentario.',
    minLength: 1,
    maxLength: 500
  })
  @IsString({ message: 'El contenido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El contenido del comentario no puede estar vacío.' })
  @Length(1, 500, {
    message: 'El contenido debe tener entre 1 y 500 caracteres.'
  })
  content: string;

  @ApiProperty({
    description: 'ID del post al que pertenece el comentario.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsNotEmpty({ message: 'El campo "postId" es obligatorio.' })
  @IsUUID('all', { message: 'El campo "postId" debe ser un UUID válido.' })
  postId: string;

  @ApiProperty({
    description: 'ID del usuario que realiza el comentario.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsNotEmpty({ message: 'El campo "userId" es obligatorio.' })
  @IsUUID('all', { message: 'El campo "userId" debe ser un UUID válido.' })
  userId: string;
}
