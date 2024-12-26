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

export class CreateServicesCatalogDto {
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio.' })
  @IsString({ message: 'El nombre del servicio debe ser un texto.' })
  name: string;

  @IsNotEmpty({ message: 'La descripción del servicio es obligatoria.' })
  @IsString({ message: 'La descripción del servicio debe ser un texto.' })
  description: string;

  @IsNotEmpty({ message: 'El precio del servicio es obligatorio.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  price: number;

  @IsOptional()
  @IsString({ message: 'El nombre del empleado debe ser un texto.' })
  employeeName?: string;

  @IsNotEmpty({ message: 'La categoría del servicio es obligatoria.' })
  @IsEnum(ServiceCategory, {
    message: 'La categoría del servicio no es válida.'
  })
  category: ServiceCategory;

  @IsNotEmpty({ message: 'El tipo de servicio es obligatorio.' })
  @IsEnum(AnimalType, { message: 'El tipo de servicio no es válido.' })
  type: AnimalType;

  @IsNotEmpty({ message: 'El estado del servicio es obligatorio.' })
  @IsEnum(Stage, { message: 'El estado del servicio no es válido.' })
  stage: Stage;

  @IsNotEmpty({ message: 'La duración del servicio es obligatoria.' })
  @IsNumber({}, { message: 'La duración debe ser un número.' })
  @IsPositive({ message: 'La duración debe ser un valor positivo.' })
  duration: number;
}
