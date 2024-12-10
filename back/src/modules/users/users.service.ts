import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UploadImageService } from '../image-upload/image-upload.service';

// type UserWithoutSensitiveInfo = Omit<User, 'password' | 'isAdmin'>;

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private uploadImageService: UploadImageService,
  ) {}

  private generateUUID(): string {
    return uuid();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newId = this.generateUUID();
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser: User = {
        id: newId,
        ...createUserDto,
        password: hashedPassword,
        profilePicture:
          'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=',
        isAdmin: false,
        posts: [],
        appointments: [],
      };
      console.log(newUser);
      const createdUser = await this.usersRepository.createUser(newUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo crear el usuario. Por favor, intenta nuevamente más tarde. ${error}`,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.findAll();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo encontrar los usuarios. Por favor, intenta nuevamente más tarde. ${error}`,
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
        `No se pudo encontrar el usuario. Por favor, intenta nuevamente más tarde. ${error}`,
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
    profilePicture?: Express.Multer.File,
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
        profilePicture: profilePictureUrl,
      };
      const user = await this.usersRepository.updateUser(updatedUser);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo actualizar el usuario. Por favor, intenta nuevamente más tarde. ${error}`,
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
        `No se pudo eliminar el usuario. Por favor, intenta nuevamente más tarde. ${error}`,
      );
    }
  }
}
