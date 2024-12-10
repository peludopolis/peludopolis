import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

    // @ManyToOne(() => User, (user) => user.comments})
    // user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
