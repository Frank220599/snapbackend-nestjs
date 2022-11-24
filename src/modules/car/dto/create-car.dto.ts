import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsMongoId()
  type: number;
  @IsMongoId()
  color: string;
  @IsNotEmpty()
  number: string;
  // @IsNotEmpty()
  // driver: string;
}
