import { Module } from '@nestjs/common';
import { CarColorService } from './car_color.service';
import { CarColorController } from './car_color.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorModel, ColorSchema } from './schemas/car_color.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ColorModel.name, schema: ColorSchema }]),
  ],
  controllers: [CarColorController],
  providers: [CarColorService],
  exports: [MongooseModule],
})
export class CarColorModule {}
