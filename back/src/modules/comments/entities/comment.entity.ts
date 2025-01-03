import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: 'ID único del comentario.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario que escribió el comentario',
    example: 'caro'
  })
  @Column()
  author: string;

  @ApiProperty({
    description: 'Contenido del comentario.',
    example: 'Este es un comentario.',
    minLength: 1,
    maxLength: 500
  })
  @Column('text')
  content: string;

  @ApiProperty({
    description: 'Usuario que realiza el comentario.',
    type: () => User
  })
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  userId: string; // Columna explícita para el userId

  @ApiProperty({
    description: 'Post al que pertenece el comentario.',
    type: () => Post
  })
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ApiProperty({
    description: 'Fecha de creación del comentario.',
    example: '2024-12-22T10:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;
}

