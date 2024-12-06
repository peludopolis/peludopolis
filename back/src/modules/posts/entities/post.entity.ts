import { Comment } from "src/modules/comments/entities/comment.entity";
import { ServicesCatalog } from "src/modules/services-catalog/entities/services-catalog.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => ServicesCatalog, (service) => service.posts)
    @JoinColumn({ name: 'serviceId' })
    service: ServicesCatalog;

    @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
    comments: Comment[];
}