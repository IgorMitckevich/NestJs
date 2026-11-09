import {  SortDirections } from '../../../../core/dto/query.paginator-inputDto.js';
import { Type } from 'class-transformer';

export class PostsQueryInput {
  searchNameTerm?: string;
  sortBy: string = 'createdAt';
  sortDirection: SortDirections = SortDirections.desc;
  @Type(() => Number)
  pageNumber: number = 1;
  @Type(() => Number)
  pageSize: number = 10;
}

