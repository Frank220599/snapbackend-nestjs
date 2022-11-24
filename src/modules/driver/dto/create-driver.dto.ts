import { ObjectId } from 'mongoose';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCarDto } from '../../car/dto/create-car.dto';

export class CreateDriverDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  birthday: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateCarDto)
  car: CreateCarDto;
  @IsArray()
  rates: ObjectId[];
}
