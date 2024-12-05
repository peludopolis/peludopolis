import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
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
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      const payload = {
        email: user.email,
        sub: user.id,
        isAdmin: user.isAdmin
      };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '1h'
      });

      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el servicio de autenticación: ${error}`
      );
    }
  }
}
