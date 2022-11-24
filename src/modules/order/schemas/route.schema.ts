import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<RouteModel>;

@Schema({ _id: false })
export class RouteModel {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: [Number, Number] })
  coordinates: [number, number];
}

export const RouteSchema = SchemaFactory.createForClass(RouteModel);
