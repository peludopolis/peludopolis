import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPositive
} from 'class-validator';
import {
  AnimalType,
  ServiceCategory,
  Stage
} from '../entities/services-catalog.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicesCatalogDto {
  @ApiProperty({
    description: 'El nombre del servicio.',
    example: 'Corte de pelo para perros'
  })
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio.' })
  @IsString({ message: 'El nombre del servicio debe ser un texto.' })
  name: string;

  @ApiProperty({
    description: 'La descripción del servicio.',
    example: 'Corte de pelo con estilo para perros de todas las razas.'
  })
  @IsNotEmpty({ message: 'La descripción del servicio es obligatoria.' })
  @IsString({ message: 'La descripción del servicio debe ser un texto.' })
  description: string;

  @ApiProperty({
    description: 'El precio del servicio en pesos.',
    example: 1500
  })
  @IsNotEmpty({ message: 'El precio del servicio es obligatorio.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  price: number;

  @ApiPropertyOptional({
    description: 'El nombre del empleado encargado del servicio.',
    example: 'Juan Pérez'
  })
  @IsOptional()
  @IsString({ message: 'El nombre del empleado debe ser un texto.' })
  employeeName?: string;

  @ApiProperty({
    description: 'La categoría del servicio.',
    enum: ServiceCategory,
    example: 'SPA'
  })
  @IsNotEmpty({ message: 'La categoría del servicio es obligatoria.' })
  @IsEnum(ServiceCategory, {
    message: 'La categoría del servicio no es válida.'
  })
  category: ServiceCategory;

  @ApiProperty({
    description: 'El tipo de animal para el que está diseñado el servicio.',
    enum: AnimalType,
    example: 'PERRO'
  })
  @IsNotEmpty({ message: 'El tipo de servicio es obligatorio.' })
  @IsEnum(AnimalType, { message: 'El tipo de servicio no es válido.' })
  type: AnimalType;

  @ApiProperty({
    description: 'El estado actual del servicio.',
    enum: Stage,
    example: 'Adulto'
  })
  @IsNotEmpty({ message: 'El estado del servicio es obligatorio.' })
  @IsEnum(Stage, { message: 'El estado del servicio no es válido.' })
  stage: Stage;

  @ApiProperty({
    description: 'La duración estimada del servicio en minutos.',
    example: 30
  })
  @IsNotEmpty({ message: 'La duración del servicio es obligatoria.' })
  @IsNumber({}, { message: 'La duración debe ser un número.' })
  @IsPositive({ message: 'La duración debe ser un valor positivo.' })
  duration: number;
}
