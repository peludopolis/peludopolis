import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTipDto } from './dto/create-tips.dto';
import { UpdateTipDto } from './dto/update-tips.dto';
import { TipsRepository } from './tips.repository';
import { UploadImageService } from '../image-upload/image-upload.service';
import { Tip } from './entities/tips.entity';

@Injectable()
export class TipsService {
  constructor(
    private readonly tipsRepository: TipsRepository,
    private readonly uploadImageService: UploadImageService,
  ) {}
  async create(dataTip: CreateTipDto, file: Express.Multer.File) {
    const repeatedTip: Tip | null = await this.fintByTitle(dataTip.title);
    if (repeatedTip) {
      throw new BadRequestException(
        'El titulo ingresado ya ha sido seleccionado',
      );
    }
    const imgUrl: string = await this.uploadImageService.upload(file);
    await this.tipsRepository.createTip(dataTip, imgUrl);
    return {
      message: 'Tip creado correctamente',
    };
  }

  findAll() {
    return this.tipsRepository.findAllTips();
  }

  fintByTitle(title: string) {
    return this.tipsRepository.findByTitle(title);
  }
}
