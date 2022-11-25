import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { CreateCarBrandDto } from './dto/create-car_brand.dto';
import { UpdateCarBrandDto } from './dto/update-car_brand.dto';
import { getPaginationParams } from '../../utils/getPaginationParams';

@Controller('car/brands')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Post()
  create(@Body() createcarBrandDto: CreateCarBrandDto) {
    return this.carBrandService.create(createcarBrandDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.carBrandService.findAll(getPaginationParams(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carBrandService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarBrandDto: UpdateCarBrandDto,
  ) {
    return this.carBrandService.update(+id, updateCarBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carBrandService.remove(+id);
  }
}
