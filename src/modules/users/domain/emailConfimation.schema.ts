import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class EmailConfirmation {
  @Prop()
  confirmationCode: string;
  @Prop()
  expirationDate: Date;
  @Prop()
  isConfirmed: boolean;
}

export const EmailConfirmationSchema =
  SchemaFactory.createForClass(EmailConfirmation);
