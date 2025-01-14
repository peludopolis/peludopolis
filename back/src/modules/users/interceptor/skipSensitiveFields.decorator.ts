import { SetMetadata } from '@nestjs/common';

export const SkipSensitiveFieldsInterceptor = () =>
  SetMetadata('skipSensitiveFields', true);
