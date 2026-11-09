import { configModule } from './dynamic-config-module.js';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './modules/blogs/blogs.module.js';
import { PostsModule } from './modules/posts/posts.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { TestingModule } from './modules/testing/testing.module.js';
import { CommentsModule } from './modules/comments/comments.module.js';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    BlogsModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    TestingModule,
    configModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
