import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { QueryValidationDto } from './dto/queryValidationDto.dto';
import { PaymentsService } from '../payments/payments.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { SaveAppointment } from './dto/save-appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly paymentService: PaymentsService
  ) {}

  @ApiBearerAuth()
  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva cita' })
  @ApiResponse({
    status: 201,
    description: 'Cita creada exitosamente.',
    type: SaveAppointment
  })
  @ApiResponse({
    status: 400,
    description: 'Pago no aprobado o inválido.'
  })
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

  @ApiBearerAuth()
  @Get('availabilityByServices')
  @ApiOperation({ summary: 'Obtener horarios disponibles por servicios' })
  @ApiResponse({
    status: 200,
    description: 'Horarios disponibles por servicio.',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los parámetros de entrada.'
  })
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

  @ApiBearerAuth()
  @Get('all')
  @ApiOperation({ summary: 'Obtener todas las citas disponibles' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las citas disponibles.',
    isArray: true,
    type: SaveAppointment
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron citas.'
  })
  @ApiResponse({
    status: 500,
    description: 'Error en el servidor al obtener las citas.'
  })
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
