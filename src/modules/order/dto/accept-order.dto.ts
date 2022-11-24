import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AcceptOrderDTO {
  @IsNotEmpty()
  @IsMongoId()
  driverId: Types.ObjectId;
}
