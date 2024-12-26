import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  Matches,
  IsPhoneNumber
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre completo del usuario.',
    example: 'Juan Pérez'
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser un texto válido.' })
  name: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario.',
    example: 'juan.perez@example.com'
  })
  @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
  @IsEmail({}, { message: 'El correo debe ser un email válido.' })
  email: string;

  @ApiProperty({
    description:
      'La contraseña del usuario. Debe contener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.',
    example: 'Contraseña123!'
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.'
  })
  password: string;

  @ApiProperty({
    description: 'La dirección de residencia del usuario.',
    example: 'Calle Ficticia 123, Ciudad, País'
  })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía.' })
  @IsString({ message: 'La dirección debe ser un texto válido.' })
  address: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario.',
    example: '+541112345678'
  })
  @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío.' })
  @IsPhoneNumber(undefined, { message: 'El número de teléfono no es válido.' })
  phone: string;

  @ApiProperty({
    description: 'La URL de la imagen de perfil del usuario (opcional).',
    example: 'https://example.com/profile-picture.jpg',
    required: false
  })
  @IsString({ message: 'La imagen debe ser un texto válido.' })
  @IsOptional()
  profilePicture?: string;
}
