import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { PaymentsDetail } from './entities/paymentsDetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AppointmentsRepository } from './appointments.repository';
import { ServicesCatalogModule } from '../services-catalog/services-catalog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, PaymentsDetail]),
    UsersModule,
    ServicesCatalogModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
