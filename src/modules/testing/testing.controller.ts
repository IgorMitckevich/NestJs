import { Controller, Delete, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Blog, type BlogModelType } from '../blogs/domain/blog.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { User, type UserModelType } from '../users/domain/users.entity.js';
import { Post, type PostModelType } from '../posts/domain/posts.entity.js';
import {
  Comments,
  type CommentsModelType,
} from '../comments/domain/comments.entity.js';

@Controller('/testing/all-data')
export class TestingController {
  constructor(
    @InjectModel(Blog.name) private BlogModel: BlogModelType,
    @InjectModel(Post.name) private PostModel: PostModelType,
    @InjectModel(Comments.name) private CommentModel: CommentsModelType,
    @InjectModel(User.name) private UserModel: UserModelType,
  ) {}
  @Delete()
  async deleteDb(@Res() res: Response) {
    await this.BlogModel.deleteMany({});
    await this.PostModel.deleteMany({});
    await this.UserModel.deleteMany({});
    await this.CommentModel.deleteMany({});
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
