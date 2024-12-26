import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsUrl
} from 'class-validator';

export class Auth0UserDto {
  @ApiProperty({
    description: 'Identificador único del usuario en Auth0',
    type: String,
    required: false
  })
  @IsString()
  sid?: string;

  @ApiProperty({
    description: 'Nombre del usuario proporcionado por Auth0.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  given_name?: string;

  @ApiProperty({
    description: 'Apellido del usuario proporcionado por Auth0.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  family_name?: string;

  @ApiProperty({
    description: 'Nombre o alias del usuario en Auth0.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({
    description: 'Nombre completo del usuario.',
    type: String,
    required: true
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'URL de la imagen del perfil del usuario.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsUrl()
  picture?: string;

  @ApiProperty({
    description: 'Fecha en la que se actualizó la información del usuario.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  updated_at?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario.',
    type: String,
    required: true
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description:
      'Indica si el correo electrónico del usuario ha sido verificado.',
    type: Boolean,
    required: false
  })
  @IsBoolean()
  email_verified?: boolean;

  @ApiProperty({
    description: 'Identificador único del usuario (sub) en Auth0.',
    type: String,
    required: true
  })
  @IsString()
  sub?: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene permisos de administrador.',
    type: Boolean,
    required: false
  })
  isAdmin?: boolean;
}
