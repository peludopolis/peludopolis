import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { Appointment } from './entities/appointment.entity';
import { schedule } from './schedule/schedule';
import { UsersService } from '../users/users.service';
import { ServicesCatalogService } from '../services-catalog/services/services-catalog.service';
import { SaveAppointment } from './dto/save-appointment.dto';
import { ServicesCatalog } from '../services-catalog/entities/services-catalog.entity';
import { EmailService } from '../notifications/notifications.service';
import { PaymentsRepository } from '../payments/payments.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentsRepository,
    private readonly userService: UsersService,
    private readonly serviceCatalogService: ServicesCatalogService,
    private readonly emailService: EmailService,
    private readonly paymentRepository: PaymentsRepository
  ) {}

  async obtenerHorariosDisponibles(
    date: string,
    serviciosSolicitados: string[]
  ) {
    const reservedAppointments =
      await this.appointmentRepository.getReservedAppointmentsToSend(date);

    const horariosOcupados: Record<string, Set<string>> = {};

    reservedAppointments.forEach((appointment) => {
      appointment.services.forEach((service) => {
        if (!horariosOcupados[service.id]) {
          horariosOcupados[service.id] = new Set();
        }

        const indiceInicio = schedule.indexOf(
          this.formtatTimeAppointments(appointment.startTime)
        );
        const indiceFin = schedule.indexOf(
          this.formtatTimeAppointments(appointment.endTime)
        );

        if (indiceInicio !== -1 && indiceFin !== -1) {
          const horarios = schedule.slice(indiceInicio, indiceFin);
          horarios.forEach((horario) =>
            horariosOcupados[service.id].add(horario)
          );
        }
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bloquesRequeridos = serviciosSolicitados.length;
    const horariosDisponibles: Record<string, string[]> = {};

    serviciosSolicitados.forEach((servicioId) => {
      horariosDisponibles[servicioId] = [];
    });

    for (let i = 0; i <= schedule.length - 1; i++) {
      const horarioActual = schedule[i];

      serviciosSolicitados.forEach((servicioId) => {
        const estaDisponible =
          !horariosOcupados[servicioId]?.has(horarioActual) &&
          horariosDisponibles[servicioId]?.indexOf(horarioActual) === -1;

        if (estaDisponible) {
          horariosDisponibles[servicioId].push(horarioActual);
        }
      });
    }

    return horariosDisponibles;
  }

  async obtenerHorariosOcupados(
    date: Date,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    serviciosSolicitados: string[]
  ): Promise<Record<string, Set<string>>> {
    const reservedAppointments: Appointment[] =
      await this.appointmentRepository.getReservedAppointments(date);

    const horariosOcupados: Record<string, Set<string>> = {};

    reservedAppointments.forEach((cita) => {
      cita.services.forEach((servicio) => {
        if (!horariosOcupados[servicio.id]) {
          horariosOcupados[servicio.id] = new Set();
        }

        let horaActual = this.formtatTimeAppointments(cita.startTime);
        const indiceInicio = schedule.indexOf(horaActual);
        const bloques = cita.services.length;

        for (let i = 0; i < bloques; i++) {
          horariosOcupados[servicio.id].add(schedule[indiceInicio + i]);
          horaActual = schedule[indiceInicio + i + 1];
        }
      });
    });

    return horariosOcupados;
  }

  async createAppointment(dataAppointment: CreateAppointmentDto) {
    try {
      const openingTime: string = schedule[0];
      const closingTime = schedule[schedule.length - 1];

      const {
        date,
        namePet,
        startTime,
        user: userId,
        services: serviceDtos,
        payment_id
      } = dataAppointment;

      // Validar que la hora esté dentro del horario laboral
      const startMinutes = this.convertTimeToMinutes(startTime);
      const openingMinutes = this.convertTimeToMinutes(openingTime);
      const closingMinutes = this.convertTimeToMinutes(closingTime);
      const totalDuration = serviceDtos.length * 30; // Cada servicio dura 30 minutos
      const endMinutes = startMinutes + totalDuration;
      const endTime = this.convertMinutesToTime(endMinutes);

      if (startMinutes < openingMinutes || endMinutes > closingMinutes) {
        throw new BadRequestException(
          `El horario debe estar entre ${openingTime} y ${closingTime}.`
        );
      }

      // Validar usuario
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado.');
      }

      // Validar servicios
      const serviceIds = serviceDtos.map((service) => service.id);
      const services: ServicesCatalog[] =
        await this.serviceCatalogService.findManyByIds(serviceIds);
      if (services.length !== serviceDtos.length) {
        throw new BadRequestException('Algunos servicios no existen.');
      }

      // Validar disponibilidad de horarios
      const bloquesRequeridos = serviceDtos.length;
      const startIndex = schedule.indexOf(startTime);

      if (
        startIndex === -1 ||
        startIndex + bloquesRequeridos > schedule.length
      ) {
        throw new BadRequestException(
          'El horario está fuera del rango permitido.'
        );
      }

      const horariosSolicitados = schedule.slice(
        startIndex,
        startIndex + bloquesRequeridos
      );

      const horariosOcupados = await this.obtenerHorariosOcupados(
        date,
        serviceIds
      );

      const estanDisponibles = this.isRangeAvailable(
        horariosSolicitados,
        serviceIds,
        horariosOcupados
      );

      if (!estanDisponibles) {
        throw new BadRequestException(
          'El horario solicitado no está disponible.'
        );
      }

      // Validar pago
      const payment = await this.paymentRepository.findOneBy({
        id: payment_id
      });
      if (!payment) {
        throw new NotFoundException(`Pago con ID ${payment_id} no encontrado.`);
      }

      if (payment.appointment) {
        throw new BadRequestException(
          `El pago con ID ${payment_id} ya está asociado a otro turno.`
        );
      }
      // Crear cita
      const appointment: SaveAppointment = {
        date,
        namePet,
        startTime,
        endTime,
        user,
        services,
        payment
      };
      const createdAppointment =
        await this.appointmentRepository.createAppointment(appointment);
      // Enviar correo de confirmación
      const subject = 'Confirmación de turno';
      const text = `Su turno ha sido creado para el ${date} a las ${startTime}. ¡Los esperamos!`;
      await this.emailService.sendEmail(user.email, subject, text);
      return createdAppointment;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El pago ya está asociado a otra cita. Por favor, utiliza otro pago.'
        );
      }
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocurrió un error al crear la cita. Inténtalo nuevamente.'
      );
    }
  }

  async getAppointmentWithServices(
    appointmentId: string
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne(appointmentId);
    if (!appointment) {
      throw new BadRequestException(
        `No se encontró una cita con ID: ${appointmentId}`
      );
    }
    return appointment;
  }

  async getAll() {
    try {
      const allAppointments: Appointment[] =
        await this.appointmentRepository.getAllAppointments();
      if (allAppointments.length === 0) {
        return { message: 'Aún no hay citas registradas' };
      }

      return allAppointments;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las citas desde la base de datos.',
        error.message
      );
    }
  }

  private isRangeAvailable(
    posiblesHorarios: string[],
    serviciosSolicitados: string[],
    horariosOcupados: Record<string, Set<string>>
  ): boolean {
    return serviciosSolicitados.every((servicioId) => {
      const ocupados = horariosOcupados[servicioId] || new Set();

      return posiblesHorarios.every((hora) => !ocupados.has(hora));
    });
  }

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  private formtatTimeAppointments(time: string): string {
    return time.slice(0, -3);
  }
}
