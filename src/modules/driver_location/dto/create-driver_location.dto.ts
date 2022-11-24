import { IsNotEmpty } from 'class-validator';

export class CreateDriverLocationDto {
  @IsNotEmpty()
  coordinates: number[];
}
