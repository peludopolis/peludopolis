import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './service/comments.service';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { PostsModule } from '../posts/posts.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User]),
    PostsModule,
    UsersModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
