import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class QueryValidationDto {
  @IsNotEmpty({ message: 'El parámetro "date" es obligatorio.' })
  @IsDateString(
    {},
    { message: 'El parámetro "date" debe tener el formato ISO (YYYY-MM-DD).' },
  )
  date: string;

  @IsNotEmpty({ message: 'El parámetro "services" es obligatorio.' })
  @Transform(({ value }) => value.split(',').map((s: string) => s.trim())) // Transforma el string en un array
  @IsArray({
    message:
      'El parámetro "services" debe ser una lista de UUIDs separados por comas.',
  })
  @ArrayNotEmpty({ message: 'El parámetro "services" no puede estar vacío.' })
  @IsUUID('all', {
    each: true,
    message: 'Cada servicio en "services" debe ser un UUID válido.',
  })
  services: string[];
}
