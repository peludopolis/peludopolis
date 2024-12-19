import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesCatalogDto } from './create-services-catalog.dto';

export class UpdateServicesCatalogDto extends PartialType(
  CreateServicesCatalogDto
) {}
