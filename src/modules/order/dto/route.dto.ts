import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RouteDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  coordinates: number[];
}
