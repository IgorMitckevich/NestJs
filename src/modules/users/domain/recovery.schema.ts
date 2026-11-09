import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class Recovery {
  @Prop()
  recoveryCode: string;
  @Prop()
  expirationDate: Date;
}

export const RecoverySchema = SchemaFactory.createForClass(Recovery);
