import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RateDocument, RateModel } from './schemas/rate.schema';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(RateModel.name)
    private rateModel: Model<RateDocument>,
  ) {}

  async create(createRateDto: CreateRateDto) {
    // TODO: fix
    // if (!req.file) {
    //   throw new BadRequestException('No icon selected');
    // }

    const rate = await this.rateModel.findOne({ title: createRateDto.title });

    if (rate) {
      throw new BadRequestException(
        `Rate ${createRateDto.title} already has been created!`,
      );
    }

    // TODO: fix
    const newRate = await this.rateModel.create({
      ...createRateDto,
      // icon: req.file.path,
    });

    return newRate;
  }

  async findAll() {
    const rates = await this.rateModel.find();
    return rates;
  }

  async findOne(id: number) {
    const rate = await this.rateModel.findById(id);
    if (!rate) {
      throw new NotFoundException(`Rate not found`);
    }
    return rate;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  async remove(id: number) {
    const rate = await this.rateModel.findById(id);
    await rate.delete();
    return {
      message: `Rate deleted successfully`,
    };
  }
}
