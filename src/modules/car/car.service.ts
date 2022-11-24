import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarDocument, CarModel } from './schemas/car.schema';
import { PaginationParams } from '../../utils/getPaginationParams';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModel.name) private carModel: Model<CarDocument>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    // TODO: fix creating
    // if (!createCarDto.file) {
    //   throw response({
    //     statusCode: StatusCode.ClientErrorBadcreateCarDtouest,
    //     message: "No icon selected",
    //   });
    // }
    // const notDuplicated =
    //   (await this.carModel.findOne({ title: createCarDto.title })) === null;
    //
    // if (!notDuplicated) {
    //   throw new BadcreateCarDtouestException(
    //     `Rate ${createCarDto.title} already has been created!`,
    //   );
    // }
    //
    // const newRate = await this.carModel.create({
    //   ...createCarDto,
    //   icon: createCarDto.file.path,
    // });
    //
    // res.json(newRate);
  }

  async findAll({ skip, perPage, page }: PaginationParams) {
    try {
      const totalCount = await this.carModel.find().count();

      const cars = await this.carModel
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
    const car = await this.carModel.findById(id);

    if (!car) {
      throw new BadRequestException('Invalid car Id specified');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    const car = await this.carModel.findById(id);

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
