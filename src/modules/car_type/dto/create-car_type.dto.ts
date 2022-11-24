import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCarTypeDto {
  @IsMongoId()
  brand: ObjectId;
  @IsNotEmpty()
  name: string;
}
