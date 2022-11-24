import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarBrandDocument = HydratedDocument<CarBrandModel>;

@Schema({ timestamps: true })
export class CarBrandModel {
  @Prop({ type: String, required: true })
  logo: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const CarBrandSchema = SchemaFactory.createForClass(CarBrandModel);
