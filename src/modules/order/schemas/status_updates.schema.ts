import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from './order.schema';

export type StatusUpdatesDocument = HydratedDocument<StatusUpdatesModel>;

@Schema({ _id: false })
export class StatusUpdatesModel {
  @Prop({ type: String, enum: OrderStatus, required: true })
  status: string;

  @Prop({ type: Date, default: Date.now(), immutable: false })
  createdAt: Date;
}

export const StatusUpdatesSchema =
  SchemaFactory.createForClass(StatusUpdatesModel);
