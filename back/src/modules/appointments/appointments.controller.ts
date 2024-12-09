import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { QueryValidationDto } from './dto/queryValidationDto.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('create')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get('availabilityByServices')
  async getAvailableTimes(@Query() query: QueryValidationDto) {
    const serviceIds: string[] = query.services;
    const date: string = query.date;

    const availableSlots =
      await this.appointmentsService.obtenerHorariosDisponibles(
        date,
        serviceIds,
      );

    return availableSlots;
  }

  @Get('all')
  async getAllAvailability() {
    return await this.appointmentsService.getAll();
  }
}
