import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdditionalInfoDocument = HydratedDocument<AdditionalInfoModel>;

@Schema()
export class AdditionalInfoModel {
  @Prop({ type: String, required: true, unique: true })
  image: string;
}

export const AdditionalInfoSchema =
  SchemaFactory.createForClass(AdditionalInfoModel);
