import { Injectable, Inject } from '@nestjs/common';
import { UserInputDto } from '../api/input-dto/user.input-dto.js';
import { UserViewDto } from '../api/view-dto/user.view-dto.js';
import { QueryUsersRepositories } from '../infrastructure/query.users.repository.js';
import { UsersRepository } from '../infrastructure/users.repository.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) protected usersRepository: UsersRepository,
    @Inject(QueryUsersRepositories)
    protected queryUsersRepositories: QueryUsersRepositories,
  ) {}

  async create(userDto: UserInputDto): Promise<void> {

    return this.usersRepository.create(userDto);
  }
  async deleteUser(userId: string): Promise<boolean> {
    return await this.usersRepository.deleteUser(userId);
  }
}
