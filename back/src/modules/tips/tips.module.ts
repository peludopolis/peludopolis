import { Module } from '@nestjs/common';
import { TipsService } from './tips.service';
import { TipsController } from './tips.controller';
import { UploadImageModule } from '../image-upload/image-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tip } from './entities/tips.entity';
import { TipsRepository } from './tips.repository';

@Module({
  imports: [UploadImageModule, TypeOrmModule.forFeature([Tip])],
  controllers: [TipsController],
  providers: [TipsService, TipsRepository]
})
export class TipsModule {}
