import { Post } from 'src/modules/posts/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

@Entity({
  name: 'users'
})
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: false })
  isAdmin: boolean;

  // @OneToMany(() => Appointment, (appointment) => appointment.user)
  // appointments: Appointment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // @OneToMany(() => Comment, (comment) => comment.user)
  // comments: Comment[];
}
