import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarColorDto } from './dto/create-car_color.dto';
import { UpdateCarColorDto } from './dto/update-car_color.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { PaginationParams } from '../../utils/getPaginationParams';
import { ColorDocument, ColorModel } from './schemas/car_color.schema';

@Injectable()
export class CarColorService {
  constructor(
    @InjectModel(ColorModel.name)
    private colorModel: Model<ColorDocument>,
  ) {}

  async create({ name, code }: CreateCarColorDto) {
    const brand = await this.colorModel.findOne({ name });

    if (brand) {
      throw new BadRequestException(`Brand ${name} already has been created!`);
    }

    return await this.colorModel.create({
      name,
      code,
    });
  }

  async findAll({ skip, perPage, page }: PaginationParams) {
    try {
      const totalCount = await this.colorModel.find().count();

      const cars = await this.colorModel
        .find()
        .limit(perPage)
        .skip(skip)
        .sort({ createdAt: -1 });

      return {
        data: cars,
        _meta: {
          page,
          perPage,
          totalCount,
        },
      };
    } catch (e) {
      throw Error(e);
    }
  }

  async findOne(id: number) {
    const car = await this.colorModel.findById(id);

    if (!car) {
      throw new BadRequestException('Invalid car Id specified');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarColorDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    const car = await this.colorModel.findById(id);

    if (!car) {
      throw new BadRequestException('Invalid car Id specified');
    }

    await car.delete();

    return {
      statusCode: 200,
      message: `Rate deleted successfully`,
    };
  }
}
