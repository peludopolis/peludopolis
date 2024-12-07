import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { Appointment } from './entities/appointment.entity';
import { allapointments } from './schedule/allAppointments';

@Injectable()
export class AppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentsRepository) {}
  async obtenerHorariosDisponibles(
    date: string,
    serviciosSolicitados: string[], // IDs de los servicios solicitados
    // duracionServicio: number,
  ): Promise<string[]> {
    // Obtener las citas confirmadas para la fecha dada
    const reservedAppointments: Appointment[] =
      await this.appointmentRepository.getReservedAppointments(date);

    // Mapear horarios ocupados por tipo de servicio
    const horariosOcupados: Record<string, Set<string>> = {};
    reservedAppointments.forEach((cita) => {
      cita.services.forEach((servicio) => {
        if (!horariosOcupados[servicio.id]) {
          horariosOcupados[servicio.id] = new Set();
        }

        // Agregar los horarios ocupados al conjunto correspondiente
        const indiceInicio = allapointments.indexOf(cita.startTime);
        const indiceFin = allapointments.indexOf(cita.endTime);
        const horarios = allapointments.slice(indiceInicio, indiceFin);

        horarios.forEach((hora) => horariosOcupados[servicio.id].add(hora));
      });
    });

    // Calcular bloques requeridos para los servicios solicitados
    const bloquesRequeridos = serviciosSolicitados.length;

    const horariosDisponibles: string[] = [];

    // Iterar por todos los horarios posibles
    for (let i = 0; i <= allapointments.length - bloquesRequeridos; i++) {
      const posiblesHorarios = allapointments.slice(i, i + bloquesRequeridos);

      // Verificar si los horarios están disponibles para los servicios solicitados
      const estanDisponibles = serviciosSolicitados.every(
        (servicioId, index) => {
          const horaInicio = posiblesHorarios[index];
          return !horariosOcupados[servicioId]?.has(horaInicio);
        },
      );

      // Si están disponibles y son consecutivos, agregarlos
      if (
        estanDisponibles &&
        this.sonConsecutivos(posiblesHorarios, allapointments)
      ) {
        horariosDisponibles.push(posiblesHorarios[0]);
      }
    }

    return horariosDisponibles;
  }

  private sonConsecutivos(
    horarios: string[],
    todosLosHorarios: string[],
  ): boolean {
    const indices = horarios.map((horario) =>
      todosLosHorarios.indexOf(horario),
    );
    return indices.every(
      (valor, indice, arreglo) =>
        indice === 0 || valor - arreglo[indice - 1] === 1,
    );
  }
}
