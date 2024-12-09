import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateServicesCatalogDto } from '../dtos/create-services-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesCatalog } from '../entities/services-catalog.entity';
import { In, Repository } from 'typeorm';
import { UpdateServicesCatalogDto } from '../dtos/update-services-catalog.dto';

@Injectable()
export class ServicesCatalogService {
  constructor(
    @InjectRepository(ServicesCatalog)
    private readonly serviceCatalogRepository: Repository<ServicesCatalog>,
  ) {}
  private services = [
    {
      id: uuidv4(),
      name: 'Revisión general',
      description: 'Un chequeo completo para tu mascota',
    },
    { id: uuidv4(), name: 'Peinar', description: 'Estilismo para tu mascota' },
    {
      id: uuidv4(),
      name: 'Bañar',
      description: 'Un baño refrescante y relajante',
    },
    {
      id: uuidv4(),
      name: 'Cortar uñas',
      description: 'Corte y cuidado de uñas',
    },
  ];

  findAll() {
    return this.services;
  }

  findOne(id: string) {
    return this.services.find((service) => service.id === id);
  }

  async findManyByIds(ids: string[]): Promise<ServicesCatalog[]> {
    return await this.serviceCatalogRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  create(createServicesCatalogDto: CreateServicesCatalogDto) {
    const service = this.serviceCatalogRepository.create(
      createServicesCatalogDto,
    );
    return this.serviceCatalogRepository.save(service);
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
