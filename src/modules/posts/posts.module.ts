import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './domain/posts.entity.js';
import { PostsController } from './api/posts.contoroller.js';
import { PostsService } from './application/posts.service.js';
import { PostsRepositories } from './infrastructure/posts.repository.js';
import { QueryPostsRepositories } from './infrastructure/query.posts.repository.js';
import { QueryBlogsRepository } from '../blogs/infrastructure/query.blogs.repository.js';
import { Blog, BlogSchema } from '../blogs/domain/blog.entity.js';
import { QueryCommentsRepository } from '../comments/infrastructure/comments.query-repository.js';
import {
  Comments,
  CommentsSchema,
} from '../comments/domain/comments.entity.js';
import { QueryUsersRepositories } from '../users/infrastructure/query.users.repository.js';
import { User, UserSchema } from '../users/domain/users.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Comments.name, schema: CommentsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepositories,
    QueryPostsRepositories,
    QueryBlogsRepository,
    QueryCommentsRepository,
    QueryUsersRepositories,
  ],
  exports: [PostsService, QueryPostsRepositories],
})
export class PostsModule {}
