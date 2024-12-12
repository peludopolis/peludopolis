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
import { User } from '../users/entities/user.entity';

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
    const auth0User = req.oidc.user;

    if (!auth0User) {
      throw new UnauthorizedException('El usuario no está logueado');
    }

    let user: Partial<User> = await this.usersService.findByEmail(
      auth0User.email
    );

    if (!user) {
      user = await this.usersService.createUser({
        email: auth0User.email,
        password: '',
        name:
          auth0User.name || `${auth0User.given_name} ${auth0User.family_name}`,
        address: '',
        phone: ''
        // profilePicture: auth0User.picture
      });
      console.log(user);
    }

    const { accessToken } = await this.authService.generateJwtForAuth0User({
      email: user.email,
      sub: user.id,
      isAdmin: user.isAdmin
    });
    return res.json({ accessToken, user });
  }
}
