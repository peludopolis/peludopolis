import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tips.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/file-validation.pipe';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dataTip: CreateTipDto,
    @UploadedFile(
      // Por el momento las imágenes deben tener un tamaño máxim de 2MB
      new FileValidationPipe(200000, ['image/jpeg', 'image/png', 'image/webp']),
    )
    file: Express.Multer.File,
  ) {
    return this.tipsService.create(dataTip, file);
  }

  @Get()
  findAll() {
    return this.tipsService.findAll();
  }
}
