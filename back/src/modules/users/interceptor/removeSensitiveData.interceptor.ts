import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveSensitiveFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => this.removeSensitiveFields(user));
        } else if (data && typeof data === 'object') {
          return this.removeSensitiveFields(data);
        }
        return data;
      }),
    );
  }

  private removeSensitiveFields(user: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...userResponse } = user;
    return userResponse;
  }
}
