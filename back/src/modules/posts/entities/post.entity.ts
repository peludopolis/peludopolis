import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength
} from 'class-validator';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', {
    message: 'El campo "id" debe ser un UUID válido en su versión 4.'
  })
  id: string;

  @Column('text')
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La imagen no puede exceder los 255 caracteres.' })
  image?: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  @IsNotEmpty({ message: 'El usuario no puede estar vacío.' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];
}
