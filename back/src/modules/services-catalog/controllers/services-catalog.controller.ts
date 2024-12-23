import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ServicesCatalogService } from '../services/services-catalog.service';
import { CreateServicesCatalogDto } from '../dtos/create-services-catalog.dto';
import { UpdateServicesCatalogDto } from '../dtos/update-services-catalog.dto';
import { isUUID } from 'class-validator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Services Catalog')
@Controller('services-catalog')
export class ServicesCatalogController {
  constructor(
    private readonly servicesCatalogService: ServicesCatalogService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los servicios del catálogo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios obtenida exitosamente.'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.'
  })
  async findAll() {
    try {
      return await this.servicesCatalogService.findAll();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los servicios.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un servicio por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Servicio encontrado.'
  })
  @ApiResponse({
    status: 400,
    description: 'El formato del ID es inválido.'
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado.'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.'
  })
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    try {
      const service = await this.servicesCatalogService.findOne(id);
      if (!service) {
        throw new NotFoundException(`Servicio con id ${id} no encontrado`);
      }
      return service;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el servicio.');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo servicio en el catálogo' })
  @ApiResponse({
    status: 201,
    description: 'Servicio creado exitosamente.'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos proporcionados.'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.'
  })
  async create(@Body() createServiceCatalogDto: CreateServicesCatalogDto) {
    try {
      return await this.servicesCatalogService.create(createServiceCatalogDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear el nuevo servicio.'
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un servicio existente' })
  @ApiResponse({
    status: 200,
    description: 'Servicio actualizado exitosamente.'
  })
  @ApiResponse({
    status: 400,
    description:
      'El formato del ID es inválido o datos inválidos proporcionados.'
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado.'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateServiceCatalogDto: UpdateServicesCatalogDto
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    try {
      const service = await this.servicesCatalogService.findOne(id);
      if (!service) {
        throw new NotFoundException(`Servicio con id ${id} no encontrado.`);
      }
      return await this.servicesCatalogService.update(
        id,
        updateServiceCatalogDto
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar el servicio.'
      );
    }
  }
}
