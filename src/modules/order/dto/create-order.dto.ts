import { ArrayMinSize, IsNotEmpty } from 'class-validator';
import { IsArray, IsDefined, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RouteDTO } from './route.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  rateId: string;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RouteDTO)
  route: RouteDTO[];
}
