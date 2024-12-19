import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ServicesCatalogModule } from './modules/services-catalog/services-catalog.module';
import { TipsModule } from './modules/tips/tips.module';
import { EmailModule } from './modules/notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeOrm.config';
import { UploadImageModule } from './modules/image-upload/image-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),

    AuthModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1h'
      },
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AppointmentsModule,
    ServicesCatalogModule,
    TipsModule,
    EmailModule,
    UploadImageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
