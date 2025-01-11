import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UploadImageService } from '../image-upload/image-upload.service';
import { Auth0UserDto } from '../auth/dto/auth0User.dto';

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

    const existingUser = await this.usersRepository.findByEmail(adminEmail);

    if (!existingUser) {
      console.log('Creando usuario administrador...');

      const newAdmin: CreateUserDto = {
        name: 'admin',
        email: adminEmail,
        password: 'Hola123!',
        address: '123 calle del admin',
        phone: '1234567890'
      };
      await this.createUser(newAdmin);
      await this.makeAdmin(adminEmail);
      console.log('Permisos de administrador asignados.');
    } else {
      if (!existingUser.isAdmin) {
        await this.makeAdmin(adminEmail);
        console.log('Usuario administrador cargado en la base de datos.');
      } else {
        console.log(
          'El usuario administrador ya está cargado en la base de datos.'
        );
      }
    }
  }

  async findOrCreateUserFromAuth0(auth0User: Auth0UserDto) {
    let user = await this.findByEmail(auth0User.email);

    if (!user) {
      user = await this.createUser({
        email: auth0User.email,
        password: '',
        name:
          auth0User.name || `${auth0User.given_name} ${auth0User.family_name}`,
        address: '',
        phone: '',
        profilePicture: auth0User.picture
      });
    }

    return user;
  }

  async makeAdmin(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('No se encontró el usuario');
      }
      user.isAdmin = true;
      await this.usersRepository.makeAdmin(user);
    } catch (error) {
      throw new Error(
        `No se pudo asignar permisos de administrador: ${error.message}`
      );
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newId = this.generateUUID();
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser: User = {
        ...createUserDto,
        id: newId,
        password: hashedPassword,
        profilePicture: createUserDto.profilePicture
          ? createUserDto.profilePicture
          : 'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=',
        isAdmin: false,
        posts: [],
        appointments: [],
        comments: []
      };
      const createdUser = await this.usersRepository.createUser(newUser);
      return createdUser;
    } catch (error) {
      throw new Error(`No se pudo crear el usuario: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.findAll();
      return users.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ password, ...userWithoutPassword }) => userWithoutPassword
      );
    } catch (error) {
      throw new Error(
        `No se pudo obtener la lista de usuarios: ${error.message}`
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
      throw new Error(`No se pudo encontrar el usuario: ${error.message}`);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.usersRepository.findByEmail(email);
    } catch (error) {
      throw new Error(
        `No se pudo encontrar el usuario por email: ${error.message}`
      );
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
      return await this.usersRepository.updateUser(updatedUser);
    } catch (error) {
      throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
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
      throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
    }
  }
}
