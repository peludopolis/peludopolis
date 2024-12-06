import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UploadImageModule } from '../image-upload/image-upload.module';

@Module({
  imports: [UploadImageModule, TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
