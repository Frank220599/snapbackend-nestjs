import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverLocationDto } from './create-driver_location.dto';

export class UpdateDriverLocationDto extends PartialType(CreateDriverLocationDto) {}
