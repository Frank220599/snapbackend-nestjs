import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverLocationDto } from './dto/create-driver_location.dto';
import { UpdateDriverLocationDto } from './dto/update-driver_location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DriverLocationDocument,
  DriverLocationModel,
} from './schema/driver_location.schema';

@Injectable()
export class DriverLocationService {
  constructor(
    @InjectModel(DriverLocationModel.name)
    private driverLocationModel: Model<DriverLocationDocument>,
  ) {}

  create(createDriverLocationDto: CreateDriverLocationDto) {
    return 'This action adds a new driverLocation';
  }

  async findAll() {
    const driverLocations = await this.driverLocationModel.find();

    return driverLocations;
  }

  async findOne(id: number) {
    const driverLocation = await this.driverLocationModel.findById(id);

    if (!driverLocation) {
      throw new NotFoundException('Invalid DriverLocation Id specified');
    }

    return driverLocation;
  }

  async update(id: number, updateDriverLocationDto: UpdateDriverLocationDto) {
    const { coordinates } = updateDriverLocationDto;

    const newDriverLocation = await this.driverLocationModel.findOneAndUpdate(
      { driver: id },
      {
        location: {
          coordinates,
        },
      },
      { upsert: true },
    );

    return newDriverLocation;
  }

  remove(id: number) {
    return `This action removes a #${id} driverLocation`;
  }
}
