import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { QueryValidationDto } from './dto/queryValidationDto.dto';
import { PaymentsService } from '../payments/payments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly paymentService: PaymentsService
  ) {}

  @Post('create')
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    const { payment_id, ...appointmentData } = createAppointmentDto;

    const payment = await this.paymentService.getPaymentById(payment_id);

    if (!payment || payment.status !== 'approved') {
      throw new BadRequestException(
        'El pago no es válido o no ha sido aprobado'
      );
    }

    return this.appointmentsService.createAppointment({
      ...appointmentData,
      payment_id
    });
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
    return await this.appointmentsService.getAll();
  }
}
