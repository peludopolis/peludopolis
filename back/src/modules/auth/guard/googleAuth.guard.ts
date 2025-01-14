import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  private client: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new Error(
        'GOOGLE_CLIENT_ID no está definido en las variables de entorno.'
      );
    }
    this.client = new OAuth2Client(clientId);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No se proporcionó el token de Google.');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de autorización inválido.');
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Token inválido.');
      }

      const { email, name, picture } = payload;
      if (!email || !name) {
        throw new UnauthorizedException(
          'El token de Google no contiene información de usuario válida.'
        );
      }

      request['googleUser'] = { email, name, picture };
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token de Google ha expirado.');
      }
      console.log('Error al verificar el token de Google:', error.message);
      throw new UnauthorizedException('Token de Google inválido.');
    }
  }
}
