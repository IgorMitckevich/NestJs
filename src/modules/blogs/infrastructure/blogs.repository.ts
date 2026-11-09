import { Injectable } from '@nestjs/common';
import { BlogViewDto } from '../api/view-dto/Blog-viewDto.js';
import { Blog, type BlogModelType } from '../domain/blog.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { BlogInputDto } from '../api/input-dto/Blog-inputDto.js';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) protected BlogModel: BlogModelType) {}
  async create(blogDto: BlogViewDto): Promise<BlogViewDto> {
    const insertBlogs = await this.BlogModel.insertMany(blogDto);

    return blogDto;
  }
  async update(id: string, blogsInputBody: BlogInputDto): Promise<void> {
    const updateResult = await this.BlogModel.updateOne(
      { id: id },
      {
        $set: {
          name: blogsInputBody.name,
          description: blogsInputBody.description,
          websiteUrl: blogsInputBody.websiteUrl,
        },
      },
    );
    if (updateResult.matchedCount < 1) {
      throw new Error('blogs not found');
    }
    return;
  }
  async delete(id: string): Promise<void> {
    const deleteResult = await this.BlogModel.deleteOne({ id: id });
    if (deleteResult.deletedCount < 1) {
      throw new Error('blogs not found');
    }
    return;
  }
}
