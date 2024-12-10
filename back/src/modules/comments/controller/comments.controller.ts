import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    const comments = await this.commentsService.findByPost(postId);
    if (!comments || comments.length === 0) {
      throw new NotFoundException(
        `No se encontraron comentarios para el post con id ${postId}`,
      );
    }
    return comments;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comentario con id ${id} no encontrado`);
    }
    return comment;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentsService.update(id, updateCommentDto);
    return { message: `Comentario con id ${id} actualizado` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
    return { message: `Comentario con id ${id} eliminado` };
  }
}
