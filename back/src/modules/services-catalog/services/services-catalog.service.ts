import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesCatalogService {
    private services = [
        { id: 1, name: 'Revisión general', description: 'Un chequeo completo para tu mascota'},
        { id: 2, name: 'Peinar', description: 'Estilismo para tu mascota'},
        { id: 3, name: 'Bañar', description: 'Un baño refrescante y relajante'},
        { id: 4, name: 'Cortar uñas', description: 'Corte y cuidado de uñas'},
    ];

    findAll() {
        return this.services;
    }

    findOne(id: number) {
        return this.services.find(service => service.id === id);
    }
}
