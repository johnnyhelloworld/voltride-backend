import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StockRepository } from 'src/application/repositories/stock.repository';
import { Stock } from 'src/domain/entities/stock.entity';

@Injectable()
export class PrismaStockRepository implements StockRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPartName(partName: string): Promise<Stock | null> {
    return this.prisma.stock.findUnique({
      where: { partName: partName },
    });
  }

  async update(stock: Stock): Promise<void> {
    await this.prisma.stock.update({
      where: { id: stock.id },
      data: { quantity: stock.quantity },
    });
  }

  async create(stock: Stock): Promise<Stock> {
    return this.prisma.stock.create({
      data: stock,
    });
  }
}
