import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
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
  @ApiProperty({
    description: 'ID único del usuario',
    example: 'c09adf38-cf25-4878-a0de-8e26be08bb07'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez'
  })
  @Column()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser un texto válido.' })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@email.com'
  })
  @Column()
  @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
  @IsEmail({}, { message: 'El correo debe ser un email válido.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123!'
  })
  @Column()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '+5491123456789'
  })
  @Column()
  @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío.' })
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message: 'El número de teléfono no es válido.'
  })
  phone: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123, Buenos Aires'
  })
  @Column()
  @IsNotEmpty({ message: 'La dirección no puede estar vacía.' })
  @IsString({ message: 'La dirección debe ser un texto válido.' })
  address: string;

  @ApiProperty({
    description: 'Indica si el usuario es administrador',
    example: false
  })
  @Column({ default: false })
  @IsBoolean({ message: 'El valor de isAdmin debe ser un booleano.' })
  isAdmin: boolean;

  @ApiProperty({
    description: 'Lista de citas asociadas al usuario',
    type: [Appointment]
  })
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @ApiProperty({
    description: 'Lista de publicaciones asociadas al usuario',
    type: [Post]
  })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ApiProperty({
    description: 'Lista de comentarios asociados al usuario',
    type: [Comment]
  })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // @ApiProperty({
  //   description: 'Lista de pagos asociados al usuario',
  //   type: [Payment]
  // })
  // @OneToMany(() => Payment, (payment) => payment.user)
  // payments: Payment[];

  @ApiProperty({
    description: 'Imagen de perfil del usuario',
    example: 'https://example.com/imagen.jpg',
    nullable: true
  })
  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'La imagen de perfil debe ser un texto válido.' })
  profilePicture: string | null;
}
