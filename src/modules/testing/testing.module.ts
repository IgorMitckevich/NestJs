import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../posts/domain/posts.entity.js';
import { User, UserSchema } from '../users/domain/users.entity.js';
import {
  Comments,
  CommentsSchema,
} from '../comments/domain/comments.entity.js';
import { Blog, BlogSchema } from '../blogs/domain/blog.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
  ],
  controllers: [TestingController],
  providers: [],
})
export class TestingModule {}
