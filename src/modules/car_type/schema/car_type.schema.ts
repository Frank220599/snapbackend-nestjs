import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CarTypeDocument = HydratedDocument<CarTypeModel>;

@Schema({ timestamps: true })
export class CarTypeModel {
  @Prop({ type: Types.ObjectId, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const CarTypeSchema = SchemaFactory.createForClass(CarTypeModel);
