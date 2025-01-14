import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'Token de acceso' },
        user: { type: 'object', description: 'Detalles del usuario' }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas o error al iniciar sesión.'
  })
  async signin(@Body() LoginDto: LoginDto) {
    try {
      const { accessToken, user } = await this.authService.signin(LoginDto);
      return { accessToken, user };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(
        'Credenciales inválidas o error al iniciar sesión.'
      );
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente.',
    type: CreateUserDto
  })
  @ApiResponse({
    status: 400,
    description:
      'Error en los datos de entrada o fallo en la creación del usuario.'
  })
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Error en la creación del usuario.');
    }
  }
}
