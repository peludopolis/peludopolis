import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('comments')
@UseGuards(AuthGuard) 
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Request() req: any) {
    const user = req.user;// El usuario autenticado
    return this.commentsService.create(createCommentDto, user);//pasamos el usuario al servicio
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    const comments = await this.commentsService.findByPost(postId);
    if (!comments || comments.length === 0) {
      throw new NotFoundException(
        `No comments found for the post with id ${postId}`,
      );
    }
    return comments;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentsService.update(id, updateCommentDto);
    return { message: `Comment with ID ${id} updated`, comment: updatedComment };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedComment = await this.commentsService.remove(id);
    return { message: `Comment with ID ${id} deleted`, comment: deletedComment };
  }
}
