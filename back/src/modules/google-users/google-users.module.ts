import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser } from './google-user.entity';
import { GoogleUsersService } from './googleUsers.service';
import { GoogleUsersController } from './googleUsers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleUser])],
  controllers: [GoogleUsersController],
  providers: [GoogleUsersService],
  exports: [GoogleUsersService],
})
export class GoogleUsersModule {}
