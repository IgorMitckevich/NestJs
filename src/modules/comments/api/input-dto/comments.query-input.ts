import { SortDirections } from '../../../../core/dto/query.paginator-inputDto.js';

export class QueryInputDtoForComments {
  sortBy: string;
  sortDirection: SortDirections;
  pageNumber: number;
  pageSize: number;
}
