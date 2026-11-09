import { Injectable } from '@nestjs/common';
import { PostViewDto } from '../api/view-dto/post.view-dto.js';
import { PostsQueryInput } from '../api/input-dto/posts.query-input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Post, type PostModelType } from '../domain/posts.entity.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';

@Injectable()
export class QueryPostsRepositories {
  constructor(@InjectModel(Post.name) protected PostModel: PostModelType) {}
  async getAllPosts(
    queryDto: PostsQueryInput,
  ): Promise<PaginatorViewDto<PostViewDto>> {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } =
      queryDto;
    const filter: any = {};
    const skip = (pageNumber - 1) * pageSize;
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }
    const [items, totalCount] = await Promise.all([
      this.PostModel.find(filter)
        .select({ _id: 0 })
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      this.PostModel.countDocuments(filter),
    ]);

    return PaginatorViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount,
    });
  }
  async getPostById(id: string): Promise<PostViewDto | null> {
    return this.PostModel.findOne({ id: id },{_id:0}).lean();
  }
  async getPostsByBlogId(
    queryDto: PostsQueryInput,
    blogId: string,
  ): Promise<PaginatorViewDto<PostViewDto>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter = { blogId: blogId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      this.PostModel.find(filter)
        .select({ _id: 0 })
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      this.PostModel.countDocuments(filter),
    ]);
    return PaginatorViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount,
    });
  }
}
