import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Auth0UserDto } from './dto/auth0User.dto';

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
      error.message = `Error durante el inicio de sesión: ${error.message}`;
      throw error;
    }
  }

  async generateJwtForAuth0User(auth0User: Auth0UserDto) {
    try {
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
      error.message = `Error al generar el token para Auth0: ${error.message}`;
      throw error;
    }
  }
}
