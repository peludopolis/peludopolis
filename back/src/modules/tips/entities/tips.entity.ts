import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, length: 100 })
  title: string;

  @Column()
  description: string;

  //   @ManyToOne(() => User, (user) => user.tips, { eager: true })
  //   author: User;

  @Column()
  image: string;
}
