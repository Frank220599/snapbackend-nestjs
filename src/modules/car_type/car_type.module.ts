import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarTypeModel, CarTypeSchema } from './schema/car_type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarTypeModel.name, schema: CarTypeSchema },
    ]),
  ],
  controllers: [CarTypeController],
  providers: [CarTypeService],
  exports: [MongooseModule],
})
export class CarTypeModule {}
