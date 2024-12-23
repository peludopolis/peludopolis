import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ValidateIdDto {
  @ApiProperty({
    description:
      'El ID único del recurso que debe ser un UUID válido (versión 4).',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @IsUUID('4', {
    message: 'El ID proporcionado debe ser un UUID válido en su versión 4.'
  })
  id: string;
}
