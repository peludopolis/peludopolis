import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @MaxLength(500, {
    message: 'La descripción no puede exceder los 500 caracteres.'
  })
  description: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @MaxLength(255, {
    message: 'La imagen no puede exceder los 255 caracteres.'
  })
  image?: string;

  @IsNotEmpty({ message: 'El campo "userId" no puede estar vacío.' })
  @IsUUID('4', {
    message: 'El campo "userId" debe ser un UUID válido en su versión 4.'
  })
  userId: string;
}
