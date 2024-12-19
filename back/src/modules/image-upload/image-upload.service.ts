import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadImageRepository } from './image-upload.repository';

@Injectable()
export class UploadImageService {
  constructor(private readonly fileRepository: UploadImageRepository) {}
  async upload(file: Express.Multer.File): Promise<string> {
    try {
      const uploadImage = await this.fileRepository.upload(file);
      return uploadImage.secure_url;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al guardar la imagen',
        error
      );
    }
  }
}
