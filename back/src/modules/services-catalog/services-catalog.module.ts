import { Module } from '@nestjs/common';
import { ServicesCatalogController } from './controllers/services-catalog.controller';
import { ServicesCatalogService } from './services/services-catalog.service';

@Module({
  controllers: [ServicesCatalogController],
  providers: [ServicesCatalogService]
})
export class ServicesCatalogModule {}
