import { PartialType } from '@nestjs/mapped-types';
import { CreateCarColorDto } from './create-car_color.dto';

export class UpdateCarColorDto extends PartialType(CreateCarColorDto) {}
