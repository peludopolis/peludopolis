import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signin(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const userFound = await this.usersService.findByEmail(email);

      if (!userFound) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        userFound.password
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      const payload = {
        email: userFound.email,
        sub: userFound.id,
        isAdmin: userFound.isAdmin
      };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '1h'
      });

      return { accessToken, userFound };
    } catch (error) {
      error.message = `Error durante el inicio de sesión: ${error.message}`;
      throw error;
    }
  }
}
