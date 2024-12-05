import { PartialType } from '@nestjs/mapped-types';
import { CreateTipDto } from './create-tips.dto';

export class UpdateTipDto extends PartialType(CreateTipDto) {}
