import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('services_catalog')
export class ServicesCatalog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string

    @Column('decimal', { precision: 10, scale: 2})
    price: number;
}