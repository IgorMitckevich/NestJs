import { Type } from 'class-transformer';

export class QueryPaginatorInputDto {
  searchNameTerm: string;
  sortBy: string = 'createdAt';
  sortDirection: SortDirections = SortDirections.desc;
  @Type(()=>Number)
  pageNumber: number = 1;
  @Type(()=>Number)
  pageSize: number = 10;
}

export enum SortDirections {
  asc = 'asc',
  desc = 'desc',
}
