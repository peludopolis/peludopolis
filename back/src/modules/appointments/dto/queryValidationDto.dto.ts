import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsUUID
} from 'class-validator';

export class QueryValidationDto {
  @ApiProperty({
    description:
      'Fecha para la búsqueda de horarios disponibles en formato ISO (YYYY-MM-DD)',
    example: '2024-01-15'
  })
  @IsNotEmpty({ message: 'El parámetro "date" es obligatorio.' })
  @IsDateString(
    {},
    { message: 'El parámetro "date" debe tener el formato ISO (YYYY-MM-DD).' }
  )
  date: string;

  @ApiProperty({
    description:
      'Lista de IDs de servicios separados por comas (UUIDs en su versión 4)',
    example:
      'd290f1ee-6c54-4b01-90e6-d701748f0851,f290f1ee-6c54-4b01-90e6-d701748f0852'
  })
  @IsNotEmpty({ message: 'El parámetro "services" es obligatorio.' })
  @Transform(({ value }) => value.split(',').map((s: string) => s.trim()))
  @IsArray({
    message:
      'El parámetro "services" debe ser una lista de UUIDs separados por comas.'
  })
  @ArrayNotEmpty({ message: 'El parámetro "services" no puede estar vacío.' })
  @IsUUID('4', {
    each: true,
    message:
      'Cada servicio en "services" debe ser un UUID válido en su versión 4.'
  })
  services: string[];
}
