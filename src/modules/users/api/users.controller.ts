import {
  BadRequestException,
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
  Query,
} from '@nestjs/common';
import { UserInputDto } from './input-dto/user.input-dto.js';
import { QueryUsersRepositories } from '../infrastructure/query.users.repository.js';
import { UsersService } from '../application/users.service.js';
import { QueryInput } from './input-dto/query-input.js';
import { PaginatorViewDto } from '../../../core/dto/paginator-viewDto.js';
import { UserViewDto } from './view-dto/user.view-dto.js';

@Controller('users')
export class UserController {
  constructor(
    @Inject(QueryUsersRepositories)
    protected queryUsersRepositories: QueryUsersRepositories,
    @Inject(UsersService) protected usersService: UsersService,
  ) {}
  @Post()
  async createUser(@Body() body: UserInputDto) {
    const user = await this.queryUsersRepositories.getUserByEmail(body.email);
    if (user) {
      throw new BadRequestException({
        errorsMessages: [
          {
            field: 'email',
            message: 'Email already in use',
          },
        ],
      });
    }
    await this.usersService.create(body);
    return this.queryUsersRepositories.getUserByEmail(body.email);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const deleteResult = await this.usersService.deleteUser(id);
    if (!deleteResult) {
      throw new NotFoundException('User not found');
    }
  }
  @Get()
  async getAllUsers(
    @Query() query: QueryInput,
  ): Promise<PaginatorViewDto<UserViewDto>> {
    return this.queryUsersRepositories.getUsers(query);
  }
}
