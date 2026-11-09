import { Injectable } from '@nestjs/common';
import { User, type UserModelType } from '../domain/users.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDto } from '../api/view-dto/user.view-dto.js';
import { QueryInput } from '../api/input-dto/query-input.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';

@Injectable()
export class QueryUsersRepositories {
  constructor(@InjectModel(User.name) protected UserModel: UserModelType) {}

  async getUsers(queryDto: QueryInput): Promise<PaginatorViewDto<UserViewDto>> {
    const {
      searchLoginTerm,
      searchEmailTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    } = queryDto;
    const skip = (pageNumber - 1) * pageSize;
    const searchConditions = [];
    if (searchLoginTerm) {
      searchConditions.push({
        login: { $regex: searchLoginTerm, $options: 'i' },
      });
    }
    if (searchEmailTerm) {
      searchConditions.push({
        email: { $regex: searchEmailTerm, $options: 'i' },
      });
    }
    const filter = searchConditions.length > 0 ? { $or: searchConditions } : {};
    const [items, totalCount] = await Promise.all([
      this.UserModel.find(filter)
        .select({ _id: 0 ,password:0})
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      this.UserModel.countDocuments(filter),
    ]);

    return PaginatorViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount,
    });
  }
  async getUserByEmail(email: string): Promise<UserViewDto|null> {
    return this.UserModel.findOne({ email: email },{_id:0,password:0}).lean();
  }
}
