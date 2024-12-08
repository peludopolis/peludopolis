import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RemoveSensitiveFieldsInterceptor } from './modules/users/interceptor/removeSensitiveData.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*' // Para pruebas
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.useGlobalInterceptors(new RemoveSensitiveFieldsInterceptor());

  const port = process.env.PORT || 3001; // Usa el puerto de las variables de entorno o el 3000 como predeterminado
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
