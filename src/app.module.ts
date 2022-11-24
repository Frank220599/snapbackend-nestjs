import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { CarModule } from './modules/car/car.module';
import { CarBrandModule } from './modules/car_brand/car_brand.module';
import { CarTypeModule } from './modules/car_type/car_type.module';
import { CarColorModule } from './modules/car_color/car_color.module';
import { DriverModule } from './modules/driver/driver.module';
import { DriverLocationModule } from './modules/driver_location/driver_location.module';
import { MapModule } from './modules/map/map.module';
import { OrderModule } from './modules/order/order.module';
import { RateModule } from './modules/rate/rate.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AdminModule,
    CarModule,
    CarBrandModule,
    CarTypeModule,
    CarColorModule,
    DriverModule,
    DriverLocationModule,
    MapModule,
    OrderModule,
    RateModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
