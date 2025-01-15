import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tips.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../image-upload/pipes/file-validation.pipe';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Tips')
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @ApiBearerAuth()
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Crear un nuevo tip con una imagen asociada' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Tip creado exitosamente.' })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos o imagen proporcionada.'
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async create(
    @Body() dataTip: CreateTipDto,
    @UploadedFile(
      // Por el momento las imágenes deben tener un tamaño máxim de 2MB
      new FileValidationPipe(200000, ['image/jpeg', 'image/png', 'image/webp'])
    )
    file: Express.Multer.File
  ) {
    try {
      if (!file) {
        throw new BadRequestException('No se proporcionó una imagen válida.');
      }
      return this.tipsService.create(dataTip, file);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el tip.');
    }
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los tips disponibles' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tips obtenida exitosamente.'
  })
  @ApiResponse({ status: 404, description: 'No se encontraron tips.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll() {
    try {
      const tips = await this.tipsService.findAll();
      if (!tips || tips.length === 0) {
        throw new BadRequestException('No se encontraron tips.');
      }
      return tips;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los tips.');
    }
  }
}
