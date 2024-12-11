import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UploadImageService } from '../image-upload/image-upload.service';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private usersRepository: UsersRepository,
    private uploadImageService: UploadImageService
  ) {}

  private generateUUID(): string {
    return uuid();
  }

  async onModuleInit() {
    console.log('UsersService onModuleInit');

    const adminEmail = 'peludopolispf@gmail.com';

    // Buscar si el usuario administrador ya existe
    const existingUser = await this.usersRepository.findByEmail(adminEmail);

    if (!existingUser) {
      // Si no existe, crear el usuario administrador
      console.log('Creando usuario administrador...');
      const hashedPassword = await bcrypt.hash('Hola123!', 10);

      const newAdmin: CreateUserDto = {
        name: 'admin',
        email: adminEmail,
        password: hashedPassword,
        address: '123 calle del admin',
        phone: '1234567890'
      };
      await this.createUser(newAdmin);
      console.log('Usuario administrador creado.');
      // Asignar permisos de administrador
      await this.makeAdmin(adminEmail);
      console.log('Permisos de administrador asignados.');
    } else {
      // Si el usuario ya existe, verificar si es administrador
      if (!existingUser.isAdmin) {
        console.log(
          'Usuario encontrado, asignando permisos de administrador...'
        );
        await this.makeAdmin(adminEmail);
        console.log('Permisos de administrador asignados.');
      } else {
        console.log('El usuario ya es administrador.');
      }
    }
  }

  async makeAdmin(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }
    user.isAdmin = true;
    await this.usersRepository.makeAdmin(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newId = this.generateUUID();
      console.log(createUserDto.password);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      console.log(hashedPassword);
      const newUser: User = {
        ...createUserDto,
        id: newId,
        password: hashedPassword,
        profilePicture:
          'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=',
        isAdmin: false,
        posts: [],
        appointments: []
      };
      console.log(newUser);
      const createdUser = await this.usersRepository.createUser(newUser);
      console.log('USUARIO CREADO:', createdUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo crear el usuario. Por favor, intenta nuevamente más tarde. ${error}`
      );
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.findAll();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo encontrar los usuarios. Por favor, intenta nuevamente más tarde. ${error}`
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new NotFoundException('No se encontró el usuario');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo encontrar el usuario. Por favor, intenta nuevamente más tarde. ${error}`
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw new NotFoundException(`No se encontró el usuario. ${error}`);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    profilePicture?: Express.Multer.File
  ) {
    try {
      const findUser = await this.usersRepository.findById(id);
      if (!findUser) {
        throw new NotFoundException('No se encontró el usuario');
      }
      let profilePictureUrl = findUser.profilePicture;
      if (profilePicture) {
        profilePictureUrl =
          await this.uploadImageService.upload(profilePicture);
      }
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        updateUserDto.password = hashedPassword;
      }
      const updatedUser = {
        ...findUser,
        ...updateUserDto,
        profilePicture: profilePictureUrl
      };
      const user = await this.usersRepository.updateUser(updatedUser);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo actualizar el usuario. Por favor, intenta nuevamente más tarde. ${error}`
      );
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new NotFoundException('No se encontró el usuario');
      }
      await this.usersRepository.deleteUser(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo eliminar el usuario. Por favor, intenta nuevamente más tarde. ${error}`
      );
    }
  }
}
