import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OTPDocument = HydratedDocument<OTPModel>;

@Schema({ timestamps: true })
export class OTPModel {
  @Prop({ type: String, required: true, ref: 'User' })
  user: string;

  @Prop({ type: String, required: true, index: { expireAfterSeconds: 60 } })
  code: string;
}

export const OTPSchema = SchemaFactory.createForClass(OTPModel);
