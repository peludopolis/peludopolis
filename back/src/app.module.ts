import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesCatalogModule } from './services-catalog/services-catalog.module';
import { TipsModule } from './tips/tips.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, AppointmentsModule, ServicesCatalogModule, TipsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
