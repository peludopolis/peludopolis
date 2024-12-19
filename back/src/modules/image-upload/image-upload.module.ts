import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { UploadImageService } from './image-upload.service';
import { UploadImageRepository } from './image-upload.repository';

@Module({
  providers: [UploadImageService, CloudinaryConfig, UploadImageRepository],
  exports: [UploadImageService]
})
export class UploadImageModule {}
