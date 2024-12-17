import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { Appointment } from './entities/appointment.entity';
import { schedule } from './schedule/schedule';
import { UsersService } from '../users/users.service';
import { ServicesCatalogService } from '../services-catalog/services/services-catalog.service';
import { SaveAppointment } from './dto/save-appointment.dto';
import { ServicesCatalog } from '../services-catalog/entities/services-catalog.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentsRepository,
    private readonly userService: UsersService,
    private readonly serviceCatalogService: ServicesCatalogService,
  ) {}

  async obtenerHorariosDisponibles(
    date: string,
    serviciosSolicitados: string[],
  ) {
    const reservedAppointments =
      await this.appointmentRepository.getReservedAppointmentsToSend(date);
    // console.log(reservedAppointments);

    // Inicializar un registro para almacenar los horarios ocupados por servicio
    const horariosOcupados: Record<string, Set<string>> = {};

    reservedAppointments.forEach((appointment) => {
      appointment.services.forEach((service) => {
        if (!horariosOcupados[service.id]) {
          horariosOcupados[service.id] = new Set();
        }

        const indiceInicio = schedule.indexOf(
          this.formtatTimeAppointments(appointment.startTime),
        );
        const indiceFin = schedule.indexOf(
          this.formtatTimeAppointments(appointment.endTime),
        );

        if (indiceInicio !== -1 && indiceFin !== -1) {
          const horarios = schedule.slice(indiceInicio, indiceFin);
          horarios.forEach((horario) =>
            horariosOcupados[service.id].add(horario),
          );
        }
      });
    });

    // console.log(horariosOcupados);
    // Calcular bloques consecutivos libres para los servicios solicitados
    const bloquesRequeridos = serviciosSolicitados.length;
    const horariosDisponibles: Record<string, string[]> = {};

    // Inicializa la estructura para cada servicio solicitado
    serviciosSolicitados.forEach((servicioId) => {
      horariosDisponibles[servicioId] = [];
    });

    // Itera sobre los horarios en la agenda
    for (let i = 0; i <= schedule.length - 1; i++) {
      const horarioActual = schedule[i];

      serviciosSolicitados.forEach((servicioId) => {
        // Verifica si el horario actual está libre para este servicio
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
    serviciosSolicitados: string[],
  ): Promise<Record<string, Set<string>>> {
    const reservedAppointments: Appointment[] =
      await this.appointmentRepository.getReservedAppointments(date);
    // console.log(reservedAppointments);

    // Crear un mapa de horarios ocupados para cada servicio
    const horariosOcupados: Record<string, Set<string>> = {};

    reservedAppointments.forEach((cita) => {
      cita.services.forEach((servicio) => {
        if (!horariosOcupados[servicio.id]) {
          horariosOcupados[servicio.id] = new Set();
        }

        // Registrar horarios ocupados por bloques de 30 minutos
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
    const openingTime: string = schedule[0];
    const closingTime = schedule[schedule.length - 1];

    const {
      date,
      namePet,
      startTime,
      user: userId,
      services: serviceDtos,
    } = dataAppointment;

    // Paso 1: Validar que la hora esté dentro del horario laboral
    const startMinutes = this.convertTimeToMinutes(startTime);
    const openingMinutes = this.convertTimeToMinutes(openingTime);
    const closingMinutes = this.convertTimeToMinutes(closingTime);

    const totalDuration = serviceDtos.length * 30; // Cada servicio dura 30 minutos
    const endMinutes = startMinutes + totalDuration;
    const endTime = this.convertMinutesToTime(endMinutes);

    if (startMinutes < openingMinutes || endMinutes > closingMinutes) {
      throw new BadRequestException(
        `El horario debe estar entre ${openingTime} y ${closingTime}.`,
      );
    }

    // Paso 2: Resolver la relación con User
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado.');
    }

    // Paso 3: Resolver las relaciones con ServicesCatalog
    const serviceIds = serviceDtos.map((service) => service.id);
    const services: ServicesCatalog[] =
      await this.serviceCatalogService.findManyByIds(serviceIds);
    if (services.length !== serviceDtos.length) {
      throw new BadRequestException('Algunos servicios no existen.');
    }

    const bloquesRequeridos = serviceDtos.length;
    const startIndex = schedule.indexOf(startTime);

    if (startIndex === -1 || startIndex + bloquesRequeridos > schedule.length) {
      throw new BadRequestException(
        'El horario está fuera del rango permitido.',
      );
    }

    const horariosSolicitados = schedule.slice(
      startIndex,
      startIndex + bloquesRequeridos,
    );

    // Obtener horarios ocupados para la fecha
    const horariosOcupados = await this.obtenerHorariosOcupados(
      date,
      serviceIds,
    );

    // console.log(horariosOcupados);

    // Validar si los horarios solicitados están disponibles
    const estanDisponibles = this.isRangeAvailable(
      horariosSolicitados,
      serviceIds,
      horariosOcupados,
    );

    if (!estanDisponibles) {
      throw new BadRequestException(
        'El horario solicitado no está disponible.',
      );
    }

    // Paso 4: Crear el Appointment
    const appointment: SaveAppointment = {
      date,
      namePet,
      startTime,
      endTime,
      user,
      services,
      // status: 'pending', // Se comenta para pruebas
    };

    return await this.appointmentRepository.createAppointment(appointment);
  }

  async getAppointmentWithServices(appointmentId: string): Promise<Appointment> {
    // Consulta la cita incluyendo la relación con los servicios asociados
    const appointment = await this.appointmentRepository.findOne(appointmentId);
    if (!appointment) {
      throw new BadRequestException(`No se encontró una cita con ID: ${appointmentId}`);
    }
    return appointment;
  }

  async getAll() {
    const allAppointments: Appointment[] =
      await this.appointmentRepository.getAllAppointments();
    if (allAppointments.length === 0) {
      return { message: 'Aún no hay citas registradas' };
    } else return allAppointments;
  }

  private isRangeAvailable(
    posiblesHorarios: string[],
    serviciosSolicitados: string[],
    horariosOcupados: Record<string, Set<string>>,
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
