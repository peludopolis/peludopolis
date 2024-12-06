import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('signin')
  async signin(@Body() LoginDto: LoginDto) {
    const { accessToken } = await this.authService.signin(LoginDto);
    return { accessToken };
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
