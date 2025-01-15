import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado exitosamente.',
    type: Comment
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear el comentario.'
  })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los comentarios.',
    isArray: true,
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron comentarios.'
  })
  async findAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentsService.findAll();
      if (!comments || comments.length === 0) {
        throw new NotFoundException('No comments found');
      }
      return comments;
    } catch (error) {
      throw new NotFoundException(error.message || 'Error fetching comments');
    }
  }

  @ApiBearerAuth()
  @Get('post/:postId')
  @ApiOperation({ summary: 'Obtener comentarios por ID de post' })
  @ApiResponse({
    status: 200,
    description: 'Comentarios para un post.',
    isArray: true,
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron comentarios para este post.'
  })
  async findByPost(@Param('postId') postId: string) {
    try {
      const comments = await this.commentsService.findByPost(postId);
      if (!comments || comments.length === 0) {
        throw new NotFoundException(
          `No comments found for the post with id ${postId}`
        );
      }
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error fetching comments');
    }
  }

  @ApiBearerAuth()
  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener comentarios por ID de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Comentarios realizados por el usuario.',
    isArray: true,
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron comentarios para este usuario.'
  })
  async findByUser(@Param('userId') userId: string) {
    try {
      const comments = await this.commentsService.findByUser(userId);
      if (!comments || comments.length === 0) {
        throw new NotFoundException(
          `No comments found for the user with id ${userId}`
        );
      }
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error fetching comments');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Comentario encontrado.',
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'Comentario no encontrado.'
  })
  async findOne(@Param('id') id: string) {
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return comment;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un comentario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Comentario actualizado exitosamente.',
    type: Comment
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar el comentario.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const updatedComment = await this.commentsService.update(
      id,
      updateCommentDto
    );
    if (!updatedComment) {
      throw new BadRequestException('Error al actualizar el comentario');
    }
    return {
      message: `Comment with ID ${id} updated`,
      comment: updatedComment
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un comentario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Comentario eliminado exitosamente.',
    type: Comment
  })
  @ApiResponse({
    status: 404,
    description: 'Comentario no encontrado.'
  })
  async remove(@Param('id') id: string) {
    const deletedComment = await this.commentsService.remove(id);
    if (!deletedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return {
      message: `Comment with ID ${id} deleted`,
      comment: deletedComment
    };
  }
}
