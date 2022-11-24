import { PartialType } from '@nestjs/mapped-types';
import { CreateCarTypeDto } from './create-car_type.dto';

export class UpdateCarTypeDto extends PartialType(CreateCarTypeDto) {}
