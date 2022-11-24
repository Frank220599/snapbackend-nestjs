import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AcceptOrderDTO } from './dto/accept-order.dto';
import { JwtAuthGuard } from '../admin/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('accept/:id')
  async acceptOrder(@Param('id') id: string, @Body() dto: AcceptOrderDTO) {
    return this.orderService.acceptOrder(id, dto);
  }

  @Patch('wait/:id')
  async waitOrder(@Param('id') id: string) {
    return this.orderService.waitOrder(id);
  }

  @Patch('wait/:id')
  async readyToPickUp(@Param('id') id: string) {
    return this.orderService.readyToPickUp(id);
  }

  @Patch('cancel/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Patch('finish/:id')
  async finishOrder(@Param('id') id: string) {
    return this.orderService.finishOrder(id);
  }
}
