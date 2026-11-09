import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments, type CommentsModelType } from '../domain/comments.entity.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';
import { QueryInputDtoForComments } from '../api/input-dto/comments.query-input.js';
import { CommentViewDto } from '../api/view-dto/comments.view-dto.js';

@Injectable()
export class QueryCommentsRepository {
  constructor(
    @InjectModel(Comments.name) protected CommentModel: CommentsModelType,
  ) {}
  async getAllComments(
    queryDto: QueryInputDtoForComments,
    postId: string,
  ): Promise<PaginatorViewDto<CommentViewDto>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter: any = { postId: postId };
    const skip = (pageNumber - 1) * pageSize;
    const [items, totalCount] = await Promise.all([
      this.CommentModel.find(filter)
        .select({ _id: 0 })
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      this.CommentModel.countDocuments(filter),
    ]);

    return PaginatorViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount,
    });
  }
  async getCommentById(id: string): Promise<any> {}
}
