import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(
        'El header de autenticación está ausente.'
      );
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de autorización inválido.');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });

      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException('El token ha expirado.');
      }

      request['user'] = payload;
      request['tokenExp'] = payload.exp;

      return true;
    } catch (error) {
      const errorMessage =
        error.name === 'TokenExpiredError'
          ? 'El token ha expirado.'
          : 'Token inválido o error en la autenticación.';
      throw new UnauthorizedException(errorMessage);
    }
  }
}
