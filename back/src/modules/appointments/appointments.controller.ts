import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
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
        serviceIds
      );

    return availableSlots;
  }

  @Get('all')
  async getAllAvailability() {
    try {
      const allAppointments = await this.appointmentsService.getAll();
      if (Array.isArray(allAppointments) && allAppointments.length === 0) {
        throw new NotFoundException('Aún no hay citas registradas.');
      }
      return allAppointments;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las citas.',
        error.message
      );
    }
  }
}
