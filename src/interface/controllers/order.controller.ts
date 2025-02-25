import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { OrderRepository } from '../../application/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('OrderRepository') private orderRepository: OrderRepository,
  ) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  @Post()
  async createOrder(
    @Body()
    body: {
      partId: string;
      supplier: string;
      quantity: number;
      unitPrice: number;
      deliveryDate: Date | null;
      status: string;
    },
  ): Promise<void> {
    const order = new Order(
      crypto.randomUUID(),
      body.partId,
      body.supplier,
      body.quantity,
      body.unitPrice,
      new Date(),
      body.deliveryDate,
      body.quantity * body.unitPrice,
      body.status,
    );
    await this.orderRepository.save(order);
  }
}
