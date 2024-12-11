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

      return { accessToken, user };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el servicio de autenticación: ${error}`
      );
    }
  }

  async generateJwtForAuth0User(auth0User: any) {
    try {
      // Verificar si el usuario está logueado (auth0User debe existir y contener datos válidos)
      if (!auth0User || !auth0User.email || !auth0User.sub) {
        throw new UnauthorizedException(
          'El usuario no está logueado o los datos son inválidos'
        );
      }

      const payload = {
        email: auth0User.email,
        sub: auth0User.sub,
        isAdmin: auth0User.isAdmin || false
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '1h'
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(
        'Ocurrió un error inesperado al generar el token de autenticación:' +
          error
      );
    }
  }
}
