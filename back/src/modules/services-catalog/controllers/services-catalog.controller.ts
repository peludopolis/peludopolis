import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServicesCatalogService } from '../services/services-catalog.service';
import { CreateServicesCatalogDto } from '../dtos/create-services-catalog.dto';
import { UpdateServicesCatalogDto } from '../dtos/update-services-catalog.dto';

@Controller('services-catalog')
export class ServicesCatalogController {
  constructor(
    private readonly servicesCatalogService: ServicesCatalogService,
  ) {}

  @Get()
  async findAll() {
    return this.servicesCatalogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.servicesCatalogService.findOne(id);
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    return service;
  }

  @Post()
  create(@Body() createServiceCatalogDto: CreateServicesCatalogDto) {
    return this.servicesCatalogService.create(createServiceCatalogDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceCatalogDto: UpdateServicesCatalogDto,
  ) {
    return this.servicesCatalogService.update(id, updateServiceCatalogDto);
  }
}
