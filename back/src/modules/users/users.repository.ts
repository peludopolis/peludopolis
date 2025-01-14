import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  async createUser(CreateUserDto: User) {
    return this.usersRepository.save(CreateUserDto);
  }
  async findAll() {
    return this.usersRepository.find({ relations: ['appointments', 'posts'] });
  }
  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['appointments', 'posts']
    });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['appointments', 'posts']
    });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }

  async makeAdmin(user: User) {
    return this.usersRepository.save(user);
  }

  async deleteUser(id: string) {
    return this.usersRepository.delete({ id });
  }
}
