import { IsNotEmpty } from 'class-validator';

export class CreateRateDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  minPrice: string;
  @IsNotEmpty()
  pricePerKm: string;
  @IsNotEmpty()
  pricePerMin: string;
  @IsNotEmpty()
  commission: string;
  // @IsNotEmpty()
  // additionalInfo: AdditionalInfo[];
}
