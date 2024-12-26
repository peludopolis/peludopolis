import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTipDto } from './create-tips.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedTipDto extends CreateTipDto {
  @ApiProperty({
    description: 'Imagen asociada al consejo.',
    type: 'string',
    example: 'https://example.com/imagen-del-consejo.jpg'
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
