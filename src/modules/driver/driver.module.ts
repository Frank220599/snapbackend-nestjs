import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModel, DriverSchema } from './schema/driver.schema';
import { UserModel } from '../user/schemas/user.schema';
import { CarModel } from '../car/schemas/car.schema';
import { CarTypeModel } from '../car_type/schema/car_type.schema';
import { ColorModel } from '../car_color/schemas/car_color.schema';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module';
import { CarTypeModule } from '../car_type/car_type.module';
import { CarColorModule } from '../car_color/car_color.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriverModel.name, schema: DriverSchema },
    ]),
    UserModule,
    CarModule,
    CarTypeModule,
    CarColorModule,
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
