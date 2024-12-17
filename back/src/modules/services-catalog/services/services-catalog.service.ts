import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicesCatalogDto } from '../dtos/create-services-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalType, ServiceCategory, ServicesCatalog } from '../entities/services-catalog.entity';
import { In, Repository } from 'typeorm';
import { UpdateServicesCatalogDto } from '../dtos/update-services-catalog.dto';
import { serviceData } from '../service-data';

@Injectable()
export class ServicesCatalogService {
  constructor(
    @InjectRepository(ServicesCatalog)
    private readonly serviceCatalogRepository: Repository<ServicesCatalog>,
  ) {}
  
  async onModuleInit() {
    console.log('Checking and preloading services into the database...');

    for (const service of serviceData) {
      const existingService = await this.serviceCatalogRepository.findOne({
        where: { 
          name: service.name,
          type: service.type,  
          category: service.category, 
          stage: service.stage,
        },
      });
      
      if (!existingService) {
        const serviceToSave = this.serviceCatalogRepository.create({
          name: service.name,
          description: service.description,
          price: service.price,
          employeeName: service.employeeName,
          type: service.type,  
          category: service.category,
          stage: service.stage,
          duration: service.duration,
        });
        await this.serviceCatalogRepository.save(serviceToSave);
        console.log(`Service "${service.name}" added to the database.`);
      } else {
        console.log(`Service "${service.name}" already exists. Skipping.`);
      }
    }
  }

  async findAll(): Promise<ServicesCatalog[]> {
    return await this.serviceCatalogRepository.find();
  }

  async findOne(id: string): Promise<ServicesCatalog> {
    const service = await this.serviceCatalogRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async findManyByIds(ids: string[]): Promise<ServicesCatalog[]> {
    return await this.serviceCatalogRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(data: CreateServicesCatalogDto): Promise<ServicesCatalog> {
    console.log('Creando servicio:', data)
    const service = this.serviceCatalogRepository.create(data);
    const savedService = await this.serviceCatalogRepository.save(service);
    console.log('Servicio creado:', savedService); 
    return savedService;
  }

  async update(id: string, updateServiceCatalogDto: UpdateServicesCatalogDto) {
    const service = await this.serviceCatalogRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    await this.serviceCatalogRepository.update(id, updateServiceCatalogDto);

    return this.serviceCatalogRepository.findOneBy({ id });
  }

  delete(id: string) {
    return this.serviceCatalogRepository.delete(id);
  }
}
