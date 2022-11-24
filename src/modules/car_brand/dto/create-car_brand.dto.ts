import { IsNotEmpty } from 'class-validator';

export class CreateCarBrandDto {
  @IsNotEmpty()
  logo: string;
  @IsNotEmpty()
  name: string;
}
