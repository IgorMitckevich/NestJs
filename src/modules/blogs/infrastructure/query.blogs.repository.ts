import { Injectable } from '@nestjs/common';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';
import { BlogViewDto } from '../api/view-dto/Blog-viewDto.js';
import { QueryPaginatorInputDto } from '../../../core/dto/query.paginator-inputDto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, type BlogModelType } from '../domain/blog.entity.js';

@Injectable()
export class QueryBlogsRepository {
  constructor(@InjectModel(Blog.name) protected BlogModel: BlogModelType) {}
  async getAllBlogs(
    queryDto: QueryPaginatorInputDto,
  ): Promise<PaginatorViewDto<BlogViewDto>> {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } =
      queryDto;
    const filter: any = {};
    const skip = (pageNumber - 1) * pageSize;
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }
    const [items, totalCount] = await Promise.all([
      this.BlogModel.find(filter)
        .select({ _id: 0, __v: 0 })
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      this.BlogModel.countDocuments(filter),
    ]);

    return PaginatorViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount,
    });
  }
  async getBlogById(id: string): Promise<BlogViewDto | null> {
    const blog: BlogViewDto | null = await this.BlogModel.findOne({
      id: id,
    }).lean();
    if (!blog) {
      return null;
    }
    return BlogViewDto.mapToView(blog);
  }
}
