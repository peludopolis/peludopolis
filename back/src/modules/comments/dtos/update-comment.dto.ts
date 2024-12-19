import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString({ message: 'El contenido debe ser una cadena de texto.' })
  @Length(1, 500, {
    message: 'El contenido del comentario debe tener entre 1 y 500 caracteres.'
  })
  content?: string;
}
