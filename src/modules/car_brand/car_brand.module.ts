import { Module } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { CarBrandController } from './car_brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarBrandModel, CarBrandSchema } from './schemas/car_brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarBrandModel.name, schema: CarBrandSchema },
    ]),
  ],
  controllers: [CarBrandController],
  providers: [CarBrandService],
})
export class CarBrandModule {}
