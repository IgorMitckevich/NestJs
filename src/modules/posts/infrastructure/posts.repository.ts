import { Injectable } from '@nestjs/common';
import { PostViewDto } from '../api/view-dto/post.view-dto.js';
import { Post, type PostModelType } from '../domain/posts.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { PostInputDto } from '../api/input-dto/post.input-dto.js';

@Injectable()
export class PostsRepositories {
  constructor(@InjectModel(Post.name) protected PostModel: PostModelType) {}

  async create(post: PostViewDto): Promise<PostViewDto> {
    await this.PostModel.insertMany(post);
    return { ...post };
  }
  async update(id: string, postsInputBody: PostInputDto): Promise<void> {
    const updatePost = await this.PostModel.updateOne(
      { id: id },
      {
        $set: {
          title: postsInputBody.title,
          shortDescription: postsInputBody.shortDescription,
          content: postsInputBody.content,
          blogId: postsInputBody.blogId,
        },
      },
    );

    if (updatePost.matchedCount < 1) {
      throw new Error('blogs not found');
    }

    return;
  }
  async delete(id: string): Promise<void> {
    const deletePost = await this.PostModel.deleteOne({ id: id });
    if (deletePost.deletedCount < 1) {
      throw new Error('blogs not found');
    }
    return;
  }
}
