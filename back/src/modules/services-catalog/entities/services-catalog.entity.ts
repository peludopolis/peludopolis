import { Post } from "src/modules/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('services_catalog')
export class ServicesCatalog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string

    @Column('decimal', { precision: 10, scale: 2})
    price: number;

    @OneToMany(() => Post, (post) => post.service)
    posts: Post[];
}