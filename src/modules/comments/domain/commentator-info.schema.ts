import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class CommentatorInfo {
  @Prop()
  userId: string;
  userLogin: string;
}
