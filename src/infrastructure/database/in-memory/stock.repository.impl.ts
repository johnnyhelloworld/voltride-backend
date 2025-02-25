/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Stock } from '../../../domain/entities/stock.entity';
import { StockRepository } from '../../../application/repositories/stock.repository';

@Injectable()
export class PrismaStockRepository implements StockRepository {
  constructor(private prisma: PrismaService) {}

  async findByPartName(partName: string): Promise<Stock | null> {
    const stock = await this.prisma.stock.findUnique({
      where: { partName },
    });
    return stock
      ? new Stock(stock.id, stock.partName, stock.quantity, stock.threshold)
      : null;
  }

  async update(stock: Stock): Promise<void> {
    await this.prisma.stock.upsert({
      where: { partName: stock.partName },
      update: { quantity: stock.quantity },
      create: { partName: stock.partName, quantity: stock.quantity },
    });
  }

  async create(stock: Stock): Promise<Stock> {
    const createdStock = await this.prisma.stock.create({
      data: {
        partName: stock.partName,
        quantity: stock.quantity,
        threshold: stock.threshold ?? 0,
      },
    });

    return new Stock(
      createdStock.id,
      createdStock.partName,
      createdStock.quantity,
      createdStock.threshold,
    );
  }
}
