import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { QueryCommentsRepository } from '../infrastructure/comments.query-repository.js';


@Controller('comments')
export class CommentsController {
  constructor(
    @Inject(QueryCommentsRepository)
    protected queryCommentsRepository: QueryCommentsRepository,
  ) {}
  @Get(':id')
  async getCommentById(
    @Param('id') id: string,
  ): Promise<any> {
    const comment = await this.queryCommentsRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment not found`);
    }
    return comment
  }
}
