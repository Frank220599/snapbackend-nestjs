import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarTypeDto } from './dto/create-car_type.dto';
import { UpdateCarTypeDto } from './dto/update-car_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParams } from '../../utils/getPaginationParams';
import { CarTypeDocument, CarTypeModel } from './schema/car_type.schema';

@Injectable()
export class CarTypeService {
  constructor(
    @InjectModel(CarTypeModel.name)
    private cartTypeModel: Model<CarTypeDocument>,
  ) {}

  async create({ name, brand }: CreateCarTypeDto) {
    const isExist = await this.cartTypeModel.findOne({ name });

    if (isExist) {
      throw new BadRequestException(`Brand ${name} already has been created!`);
    }

    return await this.cartTypeModel.create({
      name,
      brand,
    });
  }

  async findAll({ skip, perPage, page }: PaginationParams) {
    try {
      const totalCount = await this.cartTypeModel.find().count();

      const cars = await this.cartTypeModel
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
    const car = await this.cartTypeModel.findById(id);

    if (!car) {
      throw new BadRequestException('Invalid car Id specified');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarTypeDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    const car = await this.cartTypeModel.findById(id);

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
