import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async getReservedAppointments(date: string): Promise<Appointment[]> {
    const reservedAppointments: Appointment[] = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.services', 'service')
      .select(['appointment.startTime', 'appointment.endTime', 'service.id'])
      .where('appointment.date = :fecha', { date })
      .andWhere('appointment.status = :status', { status: 'confirmed' })
      .getMany();

    return reservedAppointments;

    // return await this.appointmentRepository.find({
    //   select: ['startTime', 'endTime'],
    //   where: {
    //     date: date,
    //     status: 'confirmed',
    //   },
    // });
  }
}
