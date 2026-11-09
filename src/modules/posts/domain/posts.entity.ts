import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ExtendedLikesInfo,
  ExtendedLikesInfoSchema,
} from './extendedLikesInfo.schema.js';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ versionKey: false })
export class Post {
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  shortDescription: string;
  @Prop()
  content: string;
  @Prop()
  blogId: string;
  @Prop()
  blogName: string;
  @Prop()
  createdAt: string;
  @Prop({ type: ExtendedLikesInfoSchema })
  extendedLikesInfo: ExtendedLikesInfo;
}
export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;
export const PostSchema = SchemaFactory.createForClass(Post);
