import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RemoveSensitiveFieldsInterceptor } from './modules/users/interceptor/removeSensitiveData.interceptor';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Peludopolis API')
    .setDescription('Documentación de la API para Peludopolis')
    .setVersion('1.0')
    .addTag('users')
    .addTag('posts')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*' // Para pruebas
  });

  app.use(auth(auth0Config));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  app.useGlobalInterceptors(new RemoveSensitiveFieldsInterceptor());

  const port = process.env.PORT || 3001; // Usa el puerto de las variables de entorno o el 3000 como predeterminado
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
