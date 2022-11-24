import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RateModel, RateSchema } from './schemas/rate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RateModel.name, schema: RateSchema }]),
  ],
  controllers: [RateController],
  providers: [RateService],
  exports: [MongooseModule],
})
export class RateModule {}
