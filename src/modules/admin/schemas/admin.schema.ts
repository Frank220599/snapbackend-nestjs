import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum AdminRoles {
  superAdmin = 'superAdmin',
  admin = 'admin',
}

export type AdminDocument = HydratedDocument<AdminModel>;

@Schema({ timestamps: true })
export class AdminModel {
  @Prop({ required: true })
  fulName: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: AdminRoles.admin, enum: AdminRoles })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);
