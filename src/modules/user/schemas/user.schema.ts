import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRoles {
  Driver = 'driver',
  Client = 'client',
}

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ type: String, required: true })
  avatar: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: UserRoles.Client, enum: UserRoles })
  role: string;

  @Prop({ type: String })
  fcmToken: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Date, set: (d) => new Date(d * 1000) })
  birthday: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
