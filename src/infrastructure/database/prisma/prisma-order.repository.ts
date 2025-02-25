/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderRepository } from '../../../application/repositories/order.repository';
import { Order } from '../../../domain/entities/order.entity';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.partId,
          order.supplier,
          order.quantity,
          order.unitPrice,
          order.orderDate,
          order.deliveryDate,
          order.totalPrice,
          order.status,
        ),
    );
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) return null;
    return new Order(
      order.id,
      order.partId,
      order.supplier,
      order.quantity,
      order.unitPrice,
      order.orderDate,
      order.deliveryDate,
      order.totalPrice,
      order.status,
    );
  }

  async save(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        partId: order.partId,
        supplier: order.supplier,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        orderDate: order.orderDate,
        deliveryDate: order.deliveryDate,
        totalPrice: order.totalPrice,
        status: order.status,
      },
    });
  }

  async update(order: Order): Promise<void> {
    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        deliveryDate: order.deliveryDate,
        status: order.status,
      },
    });
  }
}
