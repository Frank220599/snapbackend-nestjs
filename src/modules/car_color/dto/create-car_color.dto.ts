import { IsNotEmpty } from 'class-validator';

export class CreateCarColorDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  code: string;
}
