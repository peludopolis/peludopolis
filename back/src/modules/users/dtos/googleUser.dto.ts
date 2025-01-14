import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GoogleUserDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario proveniente de Google',
    example: 'usuario@ejemplo.com',
    type: String
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario proveniente de Google',
    example: 'Juan Pérez',
    type: String
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;

  @ApiProperty({
    description: 'URL de la foto de perfil del usuario proveniente de Google',
    example: 'https://www.example.com/profile.jpg',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La foto de perfil debe ser una cadena de texto.' })
  picture?: string;
}
