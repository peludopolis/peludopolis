import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('google_users')
export class GoogleUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    googleId: string;
}
