import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModel, CarSchema } from './schemas/car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CarModel.name, schema: CarSchema }]),
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [MongooseModule],
})
export class CarModule {}
