import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

type UserWithoutSensitiveInfo = Omit<User, 'password' | 'isAdmin'>;

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private generateUUID(): string {
    return uuid();
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<UserWithoutSensitiveInfo> {
    try {
      const newId = this.generateUUID();
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser: User = {
        id: newId,
        ...createUserDto,
        password: hashedPassword,
        isAdmin: false
      };
      console.log(newUser);
      const createdUser = await this.usersRepository.createUser(newUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isAdmin, password, ...userWithoutSensitiveInfo } = createdUser;
      return userWithoutSensitiveInfo;
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
}
