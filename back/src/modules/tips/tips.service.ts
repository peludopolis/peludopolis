import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateTipDto } from './dto/create-tips.dto';
import { TipsRepository } from './tips.repository';
import { UploadImageService } from '../image-upload/image-upload.service';
import { Tip } from './entities/tips.entity';

@Injectable()
export class TipsService {
  constructor(
    private readonly tipsRepository: TipsRepository,
    private readonly uploadImageService: UploadImageService
  ) {}

  async create(dataTip: CreateTipDto, file: Express.Multer.File) {
    try {
      const repeatedTip: Tip | null = await this.fintByTitle(dataTip.title);
      if (repeatedTip) {
        throw new BadRequestException(
          'El título ingresado ya ha sido utilizado.'
        );
      }

      let imgUrl: string;
      try {
        imgUrl = await this.uploadImageService.upload(file);
      } catch {
        throw new InternalServerErrorException('Error al subir la imagen.');
      }
      await this.tipsRepository.createTip(dataTip, imgUrl);

      return {
        message: 'Tip creado correctamente'
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al subir la imagen.');
    }
  }

  async findAll() {
    try {
      const tips = await this.tipsRepository.findAllTips();
      if (!tips || tips.length === 0) {
        throw new BadRequestException('No se encontraron tips.');
      }
      return tips;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los tips.');
    }
  }

  async fintByTitle(title: string) {
    try {
      return await this.tipsRepository.findByTitle(title);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar el tip por título.'
      );
    }
  }
}
