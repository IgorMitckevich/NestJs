import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from '../application/posts.service.js';
import { QueryPostsRepositories } from '../infrastructure/query.posts.repository.js';
import { QueryUsersRepositories } from '../../users/infrastructure/query.users.repository.js';
import { PostInputDto } from './input-dto/post.input-dto.js';
import { PostViewDto } from './view-dto/post.view-dto.js';
import { PostsQueryInput } from './input-dto/posts.query-input.js';
import { QueryBlogsRepository } from '../../blogs/infrastructure/query.blogs.repository.js';
import { QueryInputDtoForComments } from '../../comments/api/input-dto/comments.query-input.js';
import { QueryCommentsRepository } from '../../comments/infrastructure/comments.query-repository.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';
import { CommentViewDto } from '../../comments/api/view-dto/comments.view-dto.js';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(PostsService) protected postsService: PostsService,
    @Inject(QueryPostsRepositories)
    protected queryPostsRepositories: QueryPostsRepositories,
    @Inject(QueryUsersRepositories)
    protected queryUsersRepositories: QueryUsersRepositories,
    @Inject(QueryBlogsRepository)
    protected queryBlogsRepositories: QueryBlogsRepository,
    @Inject(QueryCommentsRepository)
    protected queryCommentsRepository: QueryCommentsRepository,
  ) {}
  @Post()
  async createPosts(@Body() body: PostInputDto): Promise<PostViewDto> {
    const blogId = body.blogId;

    const blog = await this.queryBlogsRepositories.getBlogById(blogId);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return this.postsService.create(body, blog.id, blog.name);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePostsById(@Param('id') id: string): Promise<void> {
    const post: PostViewDto | null =
      await this.queryPostsRepositories.getPostById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    await this.postsService.delete(id);
  }
  @Get()
  async findAllPosts(
    @Query() query: PostsQueryInput,
  ): Promise<PaginatorViewDto<PostViewDto>> {
    const posts = await this.queryPostsRepositories.getAllPosts(query);
    if (!posts) {
      throw new NotFoundException('post not found');
    }

    return posts;
  }
  @Get(':id')
  async findPostsById(@Param('id') id: string): Promise<PostViewDto> {
    const post: PostViewDto | null =
      await this.queryPostsRepositories.getPostById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    return post;
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updatePostsById(@Param('id') id: string, @Body() body: PostInputDto) {
    const post: PostViewDto | null =
      await this.queryPostsRepositories.getPostById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    await this.postsService.update(id, body);
  }
  @Get(':postId/comments')
  async findAllComments(
    @Param('postId') postId: string,
    @Query() queryDto: QueryInputDtoForComments,
  ): Promise<PaginatorViewDto<CommentViewDto>> {
    const post = await this.queryPostsRepositories.getPostById(postId);
    if (!post) {
      throw new NotFoundException('post not found');
    }

    return this.queryCommentsRepository.getAllComments(queryDto, postId);
  }
}
