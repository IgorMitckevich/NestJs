import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, type UserModelType } from '../domain/users.entity.js';
import { UserInputDto } from '../api/input-dto/user.input-dto.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) protected UserModel: UserModelType) {}
  async create(userDto: UserInputDto): Promise<void> {
    const newUser = {
      ...userDto,
      id: new ObjectId().toString(),
      createdAt: new Date().toISOString(),
    };

    await this.UserModel.insertMany(newUser);

    return;
  }
  async deleteUser(userId: string): Promise<boolean> {
    const deleteUserById = await this.UserModel.deleteOne({ id: userId });
    if (deleteUserById.deletedCount < 1) {
      return false;
    }
    return true;
  }
}
