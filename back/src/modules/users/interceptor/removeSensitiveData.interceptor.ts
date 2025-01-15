import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveSensitiveFieldsInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skipSensitiveFields = this.reflector.get<boolean>(
      'skipSensitiveFields',
      context.getHandler()
    );

    if (skipSensitiveFields) {
      return next.handle();
    }

    return next.handle().pipe(map((data) => this.processResponse(data)));
  }

  private processResponse(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.processResponse(item));
    } else if (data && typeof data === 'object') {
      return this.cleanUserObject(data);
    }
    return data;
  }

  private cleanUserObject(obj: Record<string, any>): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...cleanedObj } = obj;

    for (const key in cleanedObj) {
      if (cleanedObj[key] && typeof cleanedObj[key] === 'object') {
        if (key !== 'created_at' && key !== 'updated_at') {
          cleanedObj[key] = this.processResponse(cleanedObj[key]);
        }
      }
    }

    return cleanedObj;
  }
}
