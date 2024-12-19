import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number,
    private readonly allowedTypes: string[]
  ) {}

  transform(value: Express.Multer.File) {
    if (value === null || value === undefined) {
      throw new BadRequestException(
        `No se encontró ningún imagen en la solicitud`
      );
    }
    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `El archivo supera el tamaño máximo permitido de ${this.maxSize} bytes.`
      );
    }

    if (!this.allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `El archivo debe ser de tipo: ${this.allowedTypes.join(', ')}.`
      );
    }

    return value;
  }
}
