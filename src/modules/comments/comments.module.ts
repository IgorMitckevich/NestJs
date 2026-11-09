import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './domain/comments.entity.js';
import { CommentsController } from './api/comments.controller.js';
import { QueryCommentsRepository } from './infrastructure/comments.query-repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [QueryCommentsRepository],
  exports: [QueryCommentsRepository],
})
export class CommentsModule {}
