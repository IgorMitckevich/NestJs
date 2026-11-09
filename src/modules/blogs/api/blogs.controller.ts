import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { BlogsService } from '../application/blogs.service.js';
import { QueryBlogsRepository } from '../infrastructure/query.blogs.repository.js';
import { BlogInputDto } from './input-dto/Blog-inputDto.js';
import { BlogViewDto } from './view-dto/Blog-viewDto.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';
import { QueryPaginatorInputDto } from '../../../core/dto/query.paginator-inputDto.js';
import { PostsService } from '../../posts/application/posts.service.js';
import { QueryPostsRepositories } from '../../posts/infrastructure/query.posts.repository.js';

import { PostsQueryInput } from '../../posts/api/input-dto/posts.query-input.js';
import { PostInputDto } from '../../posts/api/input-dto/post.input-dto.js';
import { PostViewDto } from '../../posts/api/view-dto/post.view-dto.js';

@Controller('blogs')
export class BlogsController {
  constructor(
    @Inject(QueryBlogsRepository)
    protected queryBlogsRepository: QueryBlogsRepository,
    @Inject(BlogsService) protected blogsService: BlogsService,
    @Inject(QueryPostsRepositories)
    protected queryPostsRepositories: QueryPostsRepositories,
    @Inject(PostsService) protected postsService: PostsService,
  ) {}
  @Get()
  async findAllBlogs(
    @Query() query: QueryPaginatorInputDto,
  ): Promise<PaginatorViewDto<BlogViewDto>> {
    return await this.queryBlogsRepository.getAllBlogs(query);
  }
  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<BlogViewDto | null> {
    const blog= await this.queryBlogsRepository.getBlogById(id);
    if(!blog){
      throw new NotFoundException('No blog found');
    }
    return blog;
  }
  @Post()
  async createBlog(@Body() body: BlogInputDto): Promise<BlogViewDto | null> {
    const newBlog = await this.blogsService.create(body);

    return this.queryBlogsRepository.getBlogById(newBlog.id);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateBlogById(
    @Param('id') id: string,
    @Body() body: BlogInputDto,
  ): Promise<void> {
    const blog: BlogViewDto | null =
      await this.queryBlogsRepository.getBlogById(id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    await this.blogsService.update(id, body);
  }
  @Get(':blogId/posts')
  async getAllPostsByBlogId(
    @Param('blogId') blogId: string,
    @Query() query: PostsQueryInput,
  ): Promise<PaginatorViewDto<PostViewDto>> {
    const findBlog = await this.queryBlogsRepository.getBlogById(blogId);
    if (!findBlog) {
      throw new NotFoundException('No blog found');
    }

    return await this.queryPostsRepositories.getPostsByBlogId(query, blogId);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBlogsById(@Param('id') id: string): Promise<void> {
    const blog: BlogViewDto | null =
      await this.queryBlogsRepository.getBlogById(id);
    if (!blog) {
      throw new NotFoundException('No blog found');
    }

    await this.blogsService.delete(id);
  }
  @Post(':blogId/posts')
  async createPostsByBlogId(
    @Param('blogId') blogId: string,
    @Body() body: PostInputDto,
  ): Promise<PostViewDto> {
    const blog = await this.queryBlogsRepository.getBlogById(blogId);
    if (!blog) {
      throw new NotFoundException('No blog found');
    }

    return this.postsService.create(body, blogId, blog.name);
  }
}
