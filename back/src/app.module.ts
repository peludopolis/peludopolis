import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ServicesCatalogModule } from './modules/services-catalog/services-catalog.module';
import { TipsModule } from './modules/tips/tips.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    AppointmentsModule,
    ServicesCatalogModule,
    TipsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
