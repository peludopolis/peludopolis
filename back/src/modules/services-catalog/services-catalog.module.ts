import { Module } from '@nestjs/common';
import { ServicesCatalogController } from './controllers/services-catalog.controller';
import { ServicesCatalogService } from './services/services-catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesCatalog } from './entities/services-catalog.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesCatalog]), UsersModule],
  controllers: [ServicesCatalogController],
  providers: [ServicesCatalogService],
  exports: [ServicesCatalogService]
})
export class ServicesCatalogModule {}
