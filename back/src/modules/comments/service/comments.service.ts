import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Repository } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { isUUID } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(
    createCommentDto: CreateCommentDto
  ): Promise<{ message: string; comment: Comment }> {
    if (!isUUID(createCommentDto.postId)) {
      throw new BadRequestException('Invalid UUID format for postId');
    }

    if (!isUUID(createCommentDto.userId)) {
      throw new BadRequestException('Invalid UUID format for userId');
    }

    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.userId }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      user,
      author: user.name
    });
    await this.commentRepository.save(comment);

    const fullComment = await this.commentRepository.findOne({
      where: { id: comment.id },
      relations: ['post', 'user']
    });

    if (!fullComment) {
      throw new NotFoundException('Comment could not be retrieved');
    }

    return {
      message: 'Comment successfully created',
      comment: fullComment
    };
  }

  async findAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find({
        relations: ['post', 'user']
      });
      return comments.map((comment) => ({
        ...comment,
        userId: comment.user.id
      }));
    } catch (error) {
      throw new NotFoundException(error.message || 'Error fetching comments');
    }
  }

  async findByPost(postId: string): Promise<Comment[]> {
    if (!isUUID(postId)) {
      throw new BadRequestException('Invalid postId format');
    }

    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'user']
    });

    if (!comments || comments.length === 0) {
      throw new NotFoundException('No comments found for this post');
    }

    return comments.map((comment) => ({
      ...comment,
      userId: comment.user.id
    }));
  }

  async findByUser(userId: string): Promise<Comment[]> {
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid userId format');
    }

    const comments = await this.commentRepository.find({
      where: { user: { id: userId } },
      relations: ['post', 'user']
    });

    if (!comments || comments.length === 0) {
      throw new NotFoundException('No comments found for this user');
    }

    return comments.map((comment) => ({
      ...comment,
      userId: comment.user.id
    }));
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['post', 'user']
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return {
      ...comment,
      userId: comment.user.id
    };
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    await this.commentRepository.update(id, updateCommentDto);

    const updatedComment = await this.commentRepository.findOne({
      where: { id },
      relations: ['post', 'user']
    });

    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return {
      ...updatedComment,
      userId: updatedComment.user.id
    };
  }

  async remove(id: string): Promise<Comment> {
    const comment = await this.findOne(id);
    await this.commentRepository.delete(id);

    return {
      ...comment,
      userId: comment.user.id
    };
  }
}

