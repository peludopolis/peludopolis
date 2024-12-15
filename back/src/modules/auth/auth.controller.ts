import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { Auth0UserDto } from './dto/auth0User.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('signin')
  async signin(@Body() LoginDto: LoginDto) {
    const { accessToken, user } = await this.authService.signin(LoginDto);
    return { accessToken, user };
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('auth0')
  async handleAuth0(@Req() req: Request, @Res() res: Response) {
    const auth0User: Auth0UserDto = req.oidc.user;
    console.log('auth0User', auth0User);

    if (!auth0User) {
      throw new UnauthorizedException('El usuario no está logueado');
    }

    // Delegamos la creación o búsqueda del usuario a UsersService
    const user = await this.usersService.findOrCreateUserFromAuth0(auth0User);

    const { accessToken } = await this.authService.generateJwtForAuth0User({
      email: user.email,
      sub: user.id,
      isAdmin: user.isAdmin
    });

    return res.json({ accessToken, user });
  }
}
