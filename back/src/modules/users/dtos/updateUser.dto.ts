import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'El nombre completo del usuario (opcional).',
    example: 'Juan Pérez',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto válido.' })
  name?: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario (opcional).',
    example: 'juan.perez@example.com',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo debe ser un email válido.' })
  email?: string;

  @ApiProperty({
    description:
      'La contraseña del usuario (opcional). Debe contener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.',
    example: 'Contraseña123!',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.'
  })
  password?: string;

  @ApiProperty({
    description: 'La dirección de residencia del usuario (opcional).',
    example: 'Calle Ficticia 123, Ciudad, País',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto válido.' })
  address?: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario (opcional).',
    example: '+541112345678',
    required: false
  })
  @IsOptional()
  @IsPhoneNumber(undefined, { message: 'El número de teléfono no es válido.' })
  phone?: string;

  @ApiProperty({
    description: 'La URL de la imagen de perfil del usuario (opcional).',
    example: 'https://example.com/profile-picture.jpg',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser un texto válido.' })
  profilePicture?: string;
}
