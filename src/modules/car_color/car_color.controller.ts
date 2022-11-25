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
import { CarColorService } from './car_color.service';
import { CreateCarColorDto } from './dto/create-car_color.dto';
import { UpdateCarColorDto } from './dto/update-car_color.dto';

@Controller('colors')
export class CarColorController {
  constructor(private readonly carColorService: CarColorService) {}

  @Post()
  create(@Body() createCarColorDto: CreateCarColorDto) {
    return this.carColorService.create(createCarColorDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.carColorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carColorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarColorDto: UpdateCarColorDto,
  ) {
    return this.carColorService.update(+id, updateCarColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carColorService.remove(+id);
  }
}
