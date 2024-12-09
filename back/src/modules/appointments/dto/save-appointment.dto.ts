import { ServicesCatalog } from 'src/modules/services-catalog/entities/services-catalog.entity';
import { ServicesCatalogService } from 'src/modules/services-catalog/services/services-catalog.service';
import { User } from 'src/modules/users/entities/user.entity';

export class SaveAppointment {
  date: Date;
  namePet: string;
  startTime: string;
  endTime: string;
  user: User;
  services: ServicesCatalog[];
  // status: string; // Se comenta para pruebas
}
