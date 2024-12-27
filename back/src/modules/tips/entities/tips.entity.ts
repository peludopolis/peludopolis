import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tips')
export class Tip {
  @ApiProperty({
    description: 'Identificador único del tip.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Título del tip. Debe ser único.',
    example: 'Cómo cuidar a tu gato en invierno',
    maxLength: 100
  })
  @Column({ unique: true, length: 100 })
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del tip.',
    example:
      'Proporciona a tu gato una cama cálida y asegúrate de que el lugar donde duerme esté libre de corrientes de aire.',
    type: 'string'
  })
  @Column({ type: 'text' })
  description: string;

  //   @ManyToOne(() => User, (user) => user.tips, { eager: true })
  //   author: User;

  @ApiProperty({
    description: 'URL de la imagen asociada al tip.',
    example: 'https://example.com/images/cat-care.jpg'
  })
  @Column({ nullable: false })
  image: string;
}
