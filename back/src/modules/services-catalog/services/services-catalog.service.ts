import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateServicesCatalogDto } from '../dtos/create-services-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesCatalog } from '../entities/services-catalog.entity';
import { In, Repository } from 'typeorm';
import { UpdateServicesCatalogDto } from '../dtos/update-services-catalog.dto';
import { serviceData } from '../service-data';

@Injectable()
export class ServicesCatalogService {
  constructor(
    @InjectRepository(ServicesCatalog)
    private readonly serviceCatalogRepository: Repository<ServicesCatalog>
  ) {}

  async onModuleInit() {
    console.log('Checking and preloading services into the database...');

    for (const service of serviceData) {
      try {
        const existingService = await this.serviceCatalogRepository.findOne({
          where: {
            name: service.name,
            type: service.type,
            category: service.category,
            stage: service.stage
          }
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
            duration: service.duration
          });
          await this.serviceCatalogRepository.save(serviceToSave);
          console.log(`Service "${service.name}" added to the database.`);
        } else {
          console.log(`Service "${service.name}" already exists. Skipping.`);
        }
      } catch (error) {
        console.error(`Error adding service "${service.name}":`, error.message);
      }
    }
  }

  async findAll(): Promise<ServicesCatalog[]> {
    const services = await this.serviceCatalogRepository.find({
      relations: ['appointment']
    });

    if (!services || services.length === 0) {
      throw new NotFoundException('No se encontraron servicios en el catálogo');
    }
    return services;
  }

  async findOne(id: string): Promise<ServicesCatalog> {
    const service = await this.serviceCatalogRepository.findOne({
      where: { id },
      relations: ['appointments']
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async findManyByIds(ids: string[]): Promise<ServicesCatalog[]> {
    if (ids.length === 0) {
      throw new BadRequestException(
        'No se proporcionaron IDs para la consulta'
      );
    }

    return await this.serviceCatalogRepository.find({
      where: {
        id: In(ids)
      }
    });
  }

  async create(data: CreateServicesCatalogDto): Promise<ServicesCatalog> {
    console.log('Creando servicio:', data);

    const existingService = await this.serviceCatalogRepository.findOne({
      where: {
        name: data.name,
        type: data.type,
        category: data.category,
        stage: data.stage
      }
    });

    if (existingService) {
      throw new NotFoundException(
        `El servicio con el nombre ${data.name} ya existe.`
      );
    }

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

    if (updateServiceCatalogDto.price && updateServiceCatalogDto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    await this.serviceCatalogRepository.update(id, updateServiceCatalogDto);

    return this.serviceCatalogRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const service = await this.serviceCatalogRepository.delete(id);

    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    await this.serviceCatalogRepository.delete(id);
    return { message: `Servicio con id ${id} eliminado exitosamente` };
  }
}
