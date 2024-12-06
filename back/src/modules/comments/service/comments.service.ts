import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepository.create(createCommentDto);
        return this.commentRepository.save(comment);
    }

    async findByPost(postId: string): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['post']
        });
    }

    async findOne(id: string): Promise<Comment> {
        const comment = this.commentRepository.findOne({ 
            where: { id }, 
            relations: ['post'] 
        });
        if (!comment) {
            throw new NotFoundException(`Comentario con id ${id} no encontrado`);
        }
        return comment;
    }
    
    async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new NotFoundException(`Comentario con id ${id} no encontrado`);
        }
        await this.commentRepository.update(id, updateCommentDto);
    }
    
    async remove(id: string): Promise<void> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new NotFoundException(`Comentario con id ${id} no encontrado`);
        }
        await this.commentRepository.delete(id);
    }
}
