import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DriverDocument = HydratedDocument<DriverModel>;

@Schema({ timestamps: true })
export class DriverModel {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Car' })
  car: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isBusy: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String })
  drivingLicense: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'Rate' })
  rates: Types.ObjectId[];
}

export const DriverSchema = SchemaFactory.createForClass(DriverModel);
