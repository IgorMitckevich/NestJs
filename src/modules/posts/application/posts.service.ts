import { Inject, Injectable } from '@nestjs/common';
import { PostsRepositories } from '../infrastructure/posts.repository.js';
import { PostInputDto } from '../api/input-dto/post.input-dto.js';
import { LikeStatus, PostViewDto } from '../api/view-dto/post.view-dto.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostsService {
  constructor(
    @Inject(PostsRepositories) protected postsRepositories: PostsRepositories,
  ) {}
  async create(
    postDto: PostInputDto,
    blogId: string,
    blogName: string,
  ): Promise<PostViewDto> {
    const post: PostViewDto = {
      id: new ObjectId().toString(),
      title: postDto.title,
      shortDescription: postDto.shortDescription,
      content: postDto.content,
      blogId: blogId,
      blogName: blogName,
      createdAt: new Date().toISOString(),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: LikeStatus.none,
        newestLikes: [],
      },
    };
    return await this.postsRepositories.create(post);
  }
  async update(id: string, postsInputBody: PostInputDto): Promise<void> {
    await this.postsRepositories.update(id, postsInputBody);
    return;
  }
  async delete(id: string): Promise<void> {
    await this.postsRepositories.delete(id);
    return;
  }
}
