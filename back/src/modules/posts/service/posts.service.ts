import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: createPostDto.userId }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepository.create({
      title: createPostDto.title,
      description: createPostDto.description,
      image: createPostDto.image,
      user: user,
      author: user.name
    });

    try {
      const savedPost = await this.postRepository.save(post);

      return {
        ...savedPost,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create post' + error.message
      );
    }
  }

  async findAll() {
    const posts = await this.postRepository.find({
      relations: ['comments', 'user']
    });
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
      author: post.user.name,
      userId: post.userId, // Incluye el userId en la respuesta
      createdAt: post.createdAt,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content
      }))
    }));
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'user']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({
      id: id,
      ...updatePostDto
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new InternalServerErrorException('Failed to delete post');
    }

    return { message: 'Post successfully deleted' };
  }
}
console.log('Hola mundo');
