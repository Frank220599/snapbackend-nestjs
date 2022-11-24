import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RouteDocument, RouteSchema } from './route.schema';
import {
  StatusUpdatesDocument,
  StatusUpdatesSchema,
} from './status_updates.schema';

export type OrderDocument = HydratedDocument<OrderModel>;

export enum PaymentType {
  Cash = 'cash',
  Card = 'card',
}

export enum OrderStatus {
  Search = 'search',
  Accepted = 'accepted',
  Arrived = 'arrived',
  Waiting = 'waiting',
  Processing = 'processing',
  Cancelled = 'cancelled',
  Done = 'done',
}

@Schema({ timestamps: true })
export class OrderModel {
  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: [RouteSchema] })
  routes: RouteDocument[];

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver' })
  driver: Types.ObjectId;

  @Prop({ type: String, enum: PaymentType, default: PaymentType.Cash })
  paymentType: string;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Search })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Rate', required: true })
  rate: Types.ObjectId;

  @Prop({ type: [StatusUpdatesSchema], ref: 'Rate', required: true })
  status_updates: StatusUpdatesDocument[];

  @Prop({ type: String })
  cancelledBy: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  cancelAvailable: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
