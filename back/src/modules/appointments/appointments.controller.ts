import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // @Post()
  // create(@Body() createAppointmentDto: CreateAppointmentDto) {
  //   return this.appointmentsService.create(createAppointmentDto);
  // }

  @Get('availability')
  findFreeAppointments(
    @Query('date') date: string,
    @Query('services') services: string,
  ) {
    const servicesrequested: string[] = services.split(',');
    return this.appointmentsService.obtenerHorariosDisponibles(
      date,
      servicesrequested,
    );
  }
}
