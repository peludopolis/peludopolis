import { ApiProperty } from '@nestjs/swagger';
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
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('posts')
export class Post {
  @ApiProperty({
    description: 'Identificador único del post en formato UUID.',
    example: 'e40e3c9b-e9d9-4bd3-9c9e-5accacf3907f'
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', {
    message: 'El campo "id" debe ser un UUID válido en su versión 4.'
  })
  id: string;

  @Column({ nullable: true, length: 100 })
  author?: string;

  @ApiProperty({
    description: 'Título del post.',
    example: 'Mi primer post'
  })
  @Column('varchar', { length: 255 })
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El título no puede exceder los 255 caracteres.' })
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del post.',
    example: 'Este es un post de ejemplo con información relevante.'
  })
  @Column('text')
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  description: string;

  @ApiProperty({
    description: 'URL de la imagen asociada al post (opcional).',
    example: 'https://example.com/imagen.jpg',
    required: false
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  image?: string;

  @ApiProperty({
    description: 'Usuario que creó el post.',
    type: () => User
  })
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  @IsNotEmpty({ message: 'El usuario no puede estar vacío.' })
  user: User;

  @ApiProperty({
    description: 'Lista de comentarios asociados al post.',
    type: [Comment]
  })
  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @ApiProperty({
    description: 'Fecha y hora de creación del post.',
    example: '2024-12-26T22:22:06.989Z'
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de la última actualización del post.',
    example: '2024-12-27T10:15:30.123Z'
  })
  @UpdateDateColumn({ type: 'timestamp' }) // Nueva columna
  updatedAt: Date;
}
