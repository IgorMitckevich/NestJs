import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class LikeDetails {
  @Prop()
  addedAt: string;
  @Prop()
  userId: string;
  @Prop()
  login: string;
}

export const LikeDetailsSchema = SchemaFactory.createForClass(LikeDetails);
