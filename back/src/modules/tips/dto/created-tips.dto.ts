import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTipDto } from './create-tips.dto';

export class CreatedTipDto extends CreateTipDto {
  image: string;
}
