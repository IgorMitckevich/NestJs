import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EmailConfirmation,
  EmailConfirmationSchema,
} from './emailConfimation.schema.js';
import { Recovery, RecoverySchema } from './recovery.schema.js';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  id: string;
  @Prop()
  login: string;
  @Prop()
  password: string;
  @Prop()
  createdAt: string;
  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;
