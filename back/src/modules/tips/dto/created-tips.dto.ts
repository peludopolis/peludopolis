import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTipDto } from './create-tips.dto';

export class CreatedTipDto extends CreateTipDto {
  @IsNotEmpty()
  @IsString()
  image: string;
}
