import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LikeDetails, LikeDetailsSchema } from './likeDetails.schema.js';
import { LikeStatus } from '../api/view-dto/post.view-dto.js';

@Schema({ versionKey: false, _id: false })
export class ExtendedLikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
  @Prop({ type: String, enum: Object.values(LikeStatus) })
  myStatus: LikeStatus;
  @Prop({ type: [LikeDetailsSchema],default:[] })
  newestLikes: LikeDetails[] | [];
}

export const ExtendedLikesInfoSchema =
  SchemaFactory.createForClass(ExtendedLikesInfo);
