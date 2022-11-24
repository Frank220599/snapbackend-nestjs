import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RateDocument = HydratedDocument<RateModel>;

@Schema({ timestamps: true })
export class RateModel {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: Number, required: true })
  minPrice: string;

  @Prop({ type: Number, required: true })
  pricePerKm: string;

  @Prop({ type: Number, required: true })
  pricePerMin: string;

  @Prop({ type: String, required: true })
  icon: string;

  @Prop({ type: Number, required: true })
  commission: string;

  // TODO: add submodel
}

export const RateSchema = SchemaFactory.createForClass(RateModel);
