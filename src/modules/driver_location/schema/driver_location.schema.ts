import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DriverLocationDocument = HydratedDocument<DriverLocationModel>;

@Schema({ timestamps: true })
export class DriverLocationModel {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Driver' })
  title: string;

  @Prop({ type: Types.ObjectId, required: true })
  location: string;

  @Prop({ type: Types.ObjectId, required: true })
  socketId: string;
}

export const DriverLocationSchema =
  SchemaFactory.createForClass(DriverLocationModel);
