import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsUrl
} from 'class-validator';

export class Auth0UserDto {
  @IsString()
  sid?: string;

  @IsOptional()
  @IsString()
  given_name?: string;

  @IsOptional()
  @IsString()
  family_name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  picture?: string;

  @IsOptional()
  @IsString()
  updated_at?: string;

  @IsEmail()
  email?: string;

  @IsBoolean()
  email_verified?: boolean;

  @IsString()
  sub?: string;

  isAdmin?: boolean;
}
