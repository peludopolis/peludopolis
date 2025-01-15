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
import { SkipSensitiveFieldsInterceptor } from '../users/interceptor/skipSensitiveFields.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @SkipSensitiveFieldsInterceptor()
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
      const { accessToken, userFound } =
        await this.authService.signin(LoginDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = userFound;
      return { accessToken, user };
    } catch (error) {
      throw new UnauthorizedException(
        'Credenciales inválidas o error al iniciar sesión.' + error
      );
    }
  }

  @SkipSensitiveFieldsInterceptor()
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
      const user = await this.usersService.createUser(createUserDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException(
        'Error en la creación del usuario.' + error
      );
    }
  }
}
