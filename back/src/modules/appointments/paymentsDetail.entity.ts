import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments_details')
export class PaymentsDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    // OneToOne(() => Appointment, (appointment) => appointment.paymentDetail)
    // @JoinColumn({ name: 'appointment_id'})
}