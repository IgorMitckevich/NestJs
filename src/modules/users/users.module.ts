import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/users.entity.js';
import { UserController } from './api/users.controller.js';
import { UsersRepository } from './infrastructure/users.repository.js';
import { QueryUsersRepositories } from './infrastructure/query.users.repository.js';
import { UsersService } from './application/users.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService, QueryUsersRepositories, UsersRepository],
  exports: [QueryUsersRepositories],
})
export class UsersModule {}
