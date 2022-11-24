import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, OrderModel, OrderStatus } from './schemas/order.schema';
import { PaginationParams } from '../../utils/getPaginationParams';
import { AcceptOrderDTO } from './dto/accept-order.dto';
import { UserRoles } from '../user/schemas/user.schema';
import {
  DriverLocationDocument,
  DriverLocationModel,
} from '../driver_location/schema/driver_location.schema';
import { RateDocument, RateModel } from '../rate/schemas/rate.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(DriverLocationModel.name)
    private driverLocationModel: Model<DriverLocationDocument>,
    @InjectModel(RateModel.name)
    private rateModel: Model<RateDocument>,
  ) {}

  public async getRateById(id: string): Promise<RateDocument> {
    const rate = await this.rateModel.findById(id);

    if (!rate) {
      throw new NotFoundException('Unknown rate specified');
    }

    return rate;
  }

  async create({ rateId, route }: CreateOrderDto) {
    // const io = req.app.get("io");

    const rate = await this.getRateById(rateId);
    // TODO: fix userId
    const newOrder = await this.orderModel.create({
      rate: rate,
      client: 1,
      routes: route,
      status_updates: [{ status: OrderStatus.Search }],
    });

    const drivers = await this.driverLocationModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: newOrder.routes[0].coordinates },
          distanceField: 'dist.calculated',
          includeLocs: 'dist.location',
          maxDistance: 200000,
          spherical: true,
        },
      },
    ]);

    return newOrder;
  }

  async findAll({ perPage, page, skip }: PaginationParams) {
    const totalCount = await this.orderModel.find().count();

    const orders = await this.orderModel
      .find()
      .limit(perPage)
      .skip(skip)
      .sort({ createdAt: -1 });

    return {
      data: orders,
      _meta: {
        page,
        perPage,
        totalCount,
      },
    };
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;

    // const rate = await this.orderModel.findById(id);
    //
    // if (!rate) {
    //   throw new NotFoundException('Unknown rate specified');
    // }
    //
    // return rate;
  }

  public async updateOrderStatusOrMore(
    order: OrderDocument,
    { status, ...otherValues }: { status: OrderStatus } | OrderDocument,
  ) {
    if (status === OrderStatus.Cancelled && !order.cancelAvailable) {
      return order;
    }

    await order.update(
      {
        status,
        ...otherValues,
        $push: { status_updates: { status } },
      },
      { new: true },
    );
  }

  async waitOrder(id: string) {
    const order = await this.findOne(id);

    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Waiting,
    });

    return order;
  }

  public acceptOrder = async (id: string, { driverId }: AcceptOrderDTO) => {
    // TODO: fix userRole
    // if (req.user.role == UserRoles.Client) {
    //   throw new BadRequestException('Only drivers can accept order');
    // }

    const order = await this.findOne(id);

    if (order.status != OrderStatus.Search) {
      throw new ForbiddenException('Forbidden');
    }

    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Accepted,
      driver: driverId,
    });

    await order.populate({
      path: 'client',
      populate: {
        path: 'user',
      },
    });

    return order;
  };

  async processOrder(id: string) {
    const order = await this.findOne(id);

    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Processing,
    });

    return order;
  }

  async finishOrder(id: string) {
    const order = await this.findOne(id);

    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Done,
    });

    return order;
  }

  async cancelOrder(id: string) {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.Cancelled) {
      return order;
    }

    // TODO: fix
    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Cancelled,
      // cancelledBy: req.user.role,
    });

    return order;
  }

  async readyToPickUp(id: string) {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.Cancelled) {
      return order;
    }

    await this.updateOrderStatusOrMore(order, {
      status: OrderStatus.Arrived,
      cancelAvailable: false,
    });
  }
}
