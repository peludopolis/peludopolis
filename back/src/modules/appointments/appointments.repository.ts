import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { StatusAppointment } from './enum/status-appointment.enum';
import { SaveAppointment } from './dto/save-appointment.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async getReservedAppointments(date: Date): Promise<Appointment[]> {
    const reservedAppointments: Appointment[] = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.services', 'service')
      .select(['appointment.startTime', 'appointment.endTime', 'service.id'])
      .where('appointment.date = :date', { date })
      .andWhere('appointment.status = :status', {
        status: StatusAppointment.Confirmed,
      })
      .getMany();
    return reservedAppointments;
  }

  async createAppointment(dataAppointment: SaveAppointment) {
    const appointmentCreated: Appointment = this.appointmentRepository.create({
      ...dataAppointment,
      createdAt: new Date(),
    });
    await this.appointmentRepository.save(appointmentCreated);
    return {
      message: 'Cita agendada correctamente',
      appointment: appointmentCreated,
    };
  }

  async getReservedAppointmentsToSend(date: string): Promise<Appointment[]> {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.services', 'service')
      .select([
        'appointment.startTime',
        'appointment.endTime',
        'appointment.date',
        'appointment.id',
        'service.id',
      ])
      .where('appointment.date = :date', { date })
      .andWhere('appointment.status = :status', {
        status: StatusAppointment.Confirmed,
      })
      .getMany();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async findOne(appointmentId: string): Promise<Appointment | null> {
    return await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['services'], 
    });
  }
}
