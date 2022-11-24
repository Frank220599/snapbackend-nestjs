import { Module } from '@nestjs/common';
import { DriverLocationService } from './driver_location.service';
import { DriverLocationController } from './driver_location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DriverLocationModel,
  DriverLocationSchema,
} from './schema/driver_location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriverLocationModel.name, schema: DriverLocationSchema },
    ]),
  ],
  controllers: [DriverLocationController],
  providers: [DriverLocationService],
  exports: [MongooseModule],
})
export class DriverLocationModule {}
