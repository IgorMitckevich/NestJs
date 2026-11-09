import { Prop, Schema } from '@nestjs/mongoose';
import { LikeStatus } from '../../posts/api/view-dto/post.view-dto.js';

@Schema({ versionKey: false, _id: false })
export class LikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
  @Prop()
  myStatus: LikeStatus;
}
