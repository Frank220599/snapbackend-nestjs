import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderModel, OrderSchema } from './schemas/order.schema';
import { DriverModel } from '../driver/schema/driver.schema';
import { RateModel } from '../rate/schemas/rate.schema';
import { DriverLocationModel } from '../driver_location/schema/driver_location.schema';
import { DriverLocationModule } from '../driver_location/driver_location.module';
import { RateModule } from '../rate/rate.module';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    DriverLocationModule,
    DriverModule,
    RateModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [MongooseModule],
})
export class OrderModule {}
