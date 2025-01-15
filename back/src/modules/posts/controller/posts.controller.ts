import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { PostsService } from '../service/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { isUUID } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo post' })
  @ApiCreatedResponse({
    description: 'El post ha sido creado exitosamente.',
    schema: {
      example: {
        id: '1b2f8e67-4a97-4f93-aaa7-9a57b18b8a9e',
        title: 'Título del post',
        description: 'Descripción del post',
        image: 'https://example.com/image.png',
        user: {
          id: '29bd6879-16eb-4cd5-b071-633b1959f932',
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        createdAt: '2024-01-01T00:00:00Z'
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Error en los datos enviados.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postsService.create(createPostDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los posts' })
  @ApiResponse({
    status: 200,
    description: 'Listado de posts obtenidos correctamente.',
    schema: {
      example: [
        {
          id: '1b2f8e67-4a97-4f93-aaa7-9a57b18b8a9e',
          title: 'Título del post',
          description: 'Descripción del post',
          image: 'https://example.com/image.png',
          author: 'John Doe',
          userId: 'user123',
          createdAt: '2024-01-01T00:00:00Z',
          comments: []
        }
      ]
    }
  })
  async findAll() {
    try {
      return await this.postsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un post por ID' })
  @ApiResponse({
    status: 200,
    description: 'El post ha sido encontrado exitosamente.',
    schema: {
      example: {
        id: '1b2f8e67-4a97-4f93-aaa7-9a57b18b8a9e',
        title: 'Título del post',
        description: 'Descripción del post',
        image: 'https://example.com/image.png',
        createdAt: '2024-01-01T00:00:00Z',
        comments: []
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Formato de UUID inválido.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    try {
      return await this.postsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un post por ID' })
  @ApiResponse({
    status: 200,
    description: 'El post ha sido actualizado exitosamente.',
    schema: {
      example: {
        id: '1b2f8e67-4a97-4f93-aaa7-9a57b18b8a9e',
        title: 'Título actualizado',
        description: 'Descripción actualizada',
        image: 'https://example.com/image.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z'
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos o UUID incorrecto.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Formato de UUID inválido.');
    }
    try {
      return await this.postsService.update(id, updatePostDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar el post: ' + error.message
      );
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un post por ID' })
  @ApiResponse({
    status: 200,
    description: 'El post ha sido eliminado exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Formato de UUID inválido.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    try {
      return await this.postsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar el post: ' + error.message
      );
    }
  }
}
