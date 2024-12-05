import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ServicesCatalogService {
    private services = [
        { id: uuidv4(), name: 'Revisión general', description: 'Un chequeo completo para tu mascota'},
        { id: uuidv4(), name: 'Peinar', description: 'Estilismo para tu mascota'},
        { id: uuidv4(), name: 'Bañar', description: 'Un baño refrescante y relajante'},
        { id: uuidv4(), name: 'Cortar uñas', description: 'Corte y cuidado de uñas'},
    ];

    findAll() {
        return this.services;
    }

    findOne(id: string) {
        return this.services.find(service => service.id === id);
    }
}
