import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CarDocument = HydratedDocument<CarModel>;

@Schema({ timestamps: true })
export class CarModel {
  @Prop({ type: Types.ObjectId, required: true, ref: '' })
  type: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: '' })
  color: Types.ObjectId;

  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: [String] })
  album: string[];

  // TODO: set required true
  @Prop({ type: String })
  techCertificate: string;
}

export const CarSchema = SchemaFactory.createForClass(CarModel);
