import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PaginationParams } from '../../utils/getPaginationParams';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverDocument, DriverModel } from './schema/driver.schema';
import {
  UserDocument,
  UserModel,
  UserRoles,
} from '../user/schemas/user.schema';
import {
  ColorDocument,
  ColorModel,
} from '../car_color/schemas/car_color.schema';
import {
  CarTypeDocument,
  CarTypeModel,
} from '../car_type/schema/car_type.schema';
import { CarModel } from '../car/schemas/car.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(DriverModel.name)
    private driverModel: Model<DriverDocument>,
    @InjectModel(UserModel.name)
    private userModel: Model<UserDocument>,
    @InjectModel(CarModel.name)
    private carModel: Model<CarModel>,
    @InjectModel(ColorModel.name)
    private colorModel: Model<ColorDocument>,
    @InjectModel(CarTypeModel.name)
    private carTypeModel: Model<CarTypeDocument>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const role = UserRoles.Driver;
    const { name, phone, birthday, car, rates } = createDriverDto;

    const isUserExist = await this.userModel.findOne({ phone, role });

    if (isUserExist) {
      throw new BadRequestException('Driver Exist');
    }

    const { number, color, type } = car;

    const carColor = await this.colorModel.findById(color);

    if (!carColor) {
      throw new NotFoundException('Color not found');
    }

    const carType = await this.carTypeModel.findById(type);

    if (!carType) {
      throw new NotFoundException('CarType not found');
    }

    const user = await this.userModel.create({ name, phone, birthday, role });

    const driver = await this.driverModel.create({ user, rates });

    const driverCar = await this.carModel.create({
      driver,
      number,
      type: carType,
      color: carColor,
    });

    await driver.update({ car: driverCar });

    if (!driver) {
      throw new NotFoundException('Invalid Driver Id specified');
    }

    return {
      statusCode: 201,
      message: 'Driver Created Successfully',
    };
  }

  async findAll({ perPage, page, skip }: PaginationParams) {
    const totalCount = await this.driverModel.find().count();

    const drivers = await this.driverModel
      .find()
      .populate(['rates', 'user', 'car'])
      .limit(perPage)
      .skip(skip)
      .sort({ createdAt: -1 });

    return {
      data: drivers,
      _meta: {
        page,
        perPage,
        totalCount,
      },
    };
  }

  async findOne(id: number) {
    const driver = await this.driverModel.findById(id);

    if (!driver) {
      throw new NotFoundException('Invalid Driver Id specified');
    }
    return driver;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
