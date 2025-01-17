import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RemoveSensitiveFieldsInterceptor } from './modules/users/interceptor/removeSensitiveData.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  app.useGlobalInterceptors(
    new RemoveSensitiveFieldsInterceptor(new Reflector())
  );

  const config = new DocumentBuilder()
    .setTitle('Peludopolis API')
    .setDescription('Documentación de la API para Peludopolis')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
    .addTag('posts')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001; // Usa el puerto de las variables de entorno o el 3000 como predeterminado
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
