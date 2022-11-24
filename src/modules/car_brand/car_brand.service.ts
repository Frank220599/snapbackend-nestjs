import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParams } from '../../utils/getPaginationParams';
import { CarBrandDocument, CarBrandModel } from './schemas/car_brand.schema';
import { CreateCarBrandDto } from './dto/create-car_brand.dto';
import { UpdateCarBrandDto } from './dto/update-car_brand.dto';

@Injectable()
export class CarBrandService {
  constructor(
    @InjectModel(CarBrandModel.name)
    private carBrandModel: Model<CarBrandDocument>,
  ) {}

  async create({ name, logo }: CreateCarBrandDto) {
    const brand = await this.carBrandModel.findOne({ name });

    if (brand) {
      throw new BadRequestException(`Brand ${name} already has been created!`);
    }

    const newBrand = await this.carBrandModel.create({
      name,
      logo: logo,
    });

    return newBrand;
  }

  async findAll({ skip, perPage, page }: PaginationParams) {
    try {
      const totalCount = await this.carBrandModel.find().count();

      const cars = await this.carBrandModel
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
    const car = await this.carBrandModel.findById(id);

    if (!car) {
      throw new BadRequestException('Invalid car Id specified');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarBrandDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    const car = await this.carBrandModel.findById(id);

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
