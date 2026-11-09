import { Injectable, Inject } from '@nestjs/common';
import { BlogViewDto } from '../api/view-dto/Blog-viewDto.js';
import { BlogsRepository } from '../infrastructure/blogs.repository.js';
import { BlogInputDto } from '../api/input-dto/Blog-inputDto.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BlogsRepository) protected blogsRepository: BlogsRepository,
  ) {}
  async create(blogDto: BlogInputDto): Promise<BlogViewDto> {
    const BlogToInsert = {
      id: new ObjectId().toString(),
      name: blogDto.name,
      description: blogDto.description,
      websiteUrl: blogDto.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return this.blogsRepository.create(BlogToInsert);
  }
  async update(id: string, blogsInputBody: BlogInputDto): Promise<void> {
    await this.blogsRepository.update(id, blogsInputBody);

    return;
  }
  async delete(id: string): Promise<void> {
    await this.blogsRepository.delete(id);

    return;
  }
}
