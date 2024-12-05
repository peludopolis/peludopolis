import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor() {}

  // async signup(createUserDto: CreateUserDto) {
  //   const user = await this.usersRepository.save(createUserDto);
  //   return user;
  // }

  async prueba() {
    return 'Endpoint de auth';
  }
}
