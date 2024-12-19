import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as bufferToStream from 'buffer-to-stream';

@Injectable()
export class UploadImageRepository {
  async upload(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferToStream(file.buffer).pipe(stream);
    });
  }
}
