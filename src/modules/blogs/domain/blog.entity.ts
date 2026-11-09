import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ versionKey: false })
export class Blog {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  websiteUrl: string;
  @Prop()
  createdAt: string;
  @Prop()
  isMembership: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;
