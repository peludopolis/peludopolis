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
    //se verifica la existencia del user
    const user = await this.userRepository.findOne({
      where: { id: createPostDto.userId }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //crear el post con el user asociado
    const post = this.postRepository.create({
      description: createPostDto.description,
      image: createPostDto.image,
      user: user //asignamos el user al post
    });

    try {
      //guardamos el post en DB
      return await this.postRepository.save(post);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async findAll() {
    return await this.postRepository.find({
      relations: ['comments']
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // Preload carga el post con el ID proporcionado y actualiza las propiedades
    const post = await this.postRepository.preload({
      id: id,
      ...updatePostDto //Asignamos lso valores del dto al post
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
