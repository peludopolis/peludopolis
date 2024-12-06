import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './service/comments.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
