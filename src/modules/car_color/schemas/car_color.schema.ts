import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColorDocument = HydratedDocument<ColorModel>;

@Schema({ timestamps: true })
export class ColorModel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  code: string;
}

export const ColorSchema = SchemaFactory.createForClass(ColorModel);
