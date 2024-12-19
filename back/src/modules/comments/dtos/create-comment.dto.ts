import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'El contenido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El contenido del comentario no puede estar vacío.' })
  @Length(1, 500, {
    message: 'El contenido debe tener entre 1 y 500 caracteres.'
  })
  content: string;

  @IsUUID('all', { message: 'El campo "postId" debe ser un UUID válido.' })
  postId: string;

  @IsUUID('all', { message: 'El campo "userId" debe ser un UUID válido.' })
  userId: string;
}
