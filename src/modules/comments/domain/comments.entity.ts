import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CommentatorInfo } from './commentator-info.schema.js';
import { LikesInfo } from './likes-Info.schema.js';

@Schema({ versionKey: false })
export class Comments {
  @Prop()
  id: string;
  @Prop()
  content: string;
  @Prop({ type: CommentatorInfo })
  commentatorInfo: CommentatorInfo;
  @Prop()
  createdAt: string;
  @Prop({ type: LikesInfo })
  likesInfo: LikesInfo;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);

export type CommentsDocument = HydratedDocument<Comments>;

export type CommentsModelType = Model<CommentsDocument> & typeof Comments;
