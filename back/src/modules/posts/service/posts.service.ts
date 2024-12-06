import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    create(createPostDto: CreatePostDto) {
        const post = this.postRepository.create(createPostDto);
        return this.postRepository.save(post);
    }

    findAll() {
        return this.postRepository.find();
    }

    findOne(id: string) {
        return this.postRepository.findOne({ where: { id } });
    }

    update(id: string, updatePostDto: UpdatePostDto) {
        return this.postRepository.update(id, updatePostDto);
    }

    remove(id: string) {
        return this.postRepository.delete(id);
    }
}
