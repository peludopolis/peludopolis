import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ServicesCatalogService } from '../services/services-catalog.service';

@Controller('services-catalog')
export class ServicesCatalogController {
    constructor(private readonly servicesCatalogService: ServicesCatalogService) {}

    @Get() 
    async findAll() {
        return this.servicesCatalogService.findAll();
    }

    @Get(':id') 
    async findOne(@Param('id') id: string) {
        const service = await this.servicesCatalogService.findOne(Number(id));
        if(!service) {
            throw new NotFoundException(`Servicio con id ${id} no encontrado`);
        }
        return service;
    }
}
