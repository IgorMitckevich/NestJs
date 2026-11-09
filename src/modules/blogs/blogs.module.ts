import { Module } from '@nestjs/common';
import { BlogsController } from './api/blogs.controller.js';
import { BlogsService } from './application/blogs.service.js';
import { BlogsRepository } from './infrastructure/blogs.repository.js';
import { QueryBlogsRepository } from './infrastructure/query.blogs.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blog.entity.js';
import { Post, PostSchema } from '../posts/domain/posts.entity.js';
import { PostsService } from '../posts/application/posts.service.js';
import { PostsRepositories } from '../posts/infrastructure/posts.repository.js';
import { QueryPostsRepositories } from '../posts/infrastructure/query.posts.repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    BlogsRepository,
    QueryBlogsRepository,
    PostsService,
    PostsRepositories,
    QueryPostsRepositories,
  ],
  exports: [BlogsRepository],
})
export class BlogsModule {}
