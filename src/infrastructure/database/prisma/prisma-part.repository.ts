/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Part } from '../../../domain/entities/part.entity';
import { PartRepository } from '../../../application/repositories/part.repository';

@Injectable()
export class PrismaPartRepository implements PartRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Part[]> {
    return this.prisma.part.findMany();
  }

  async findById(id: string): Promise<Part | null> {
    return this.prisma.part.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Part | null> {
    return this.prisma.part.findFirst({ where: { name } });
  }

  async updateQuantity(partId: string, quantity: number): Promise<void> {
    await this.prisma.part.update({
      where: { id: partId },
      data: { quantity },
    });
  }

  async save(part: Part): Promise<void> {
    await this.prisma.part.create({
      data: {
        id: part.id,
        name: part.name,
        description: part.description,
        quantity: part.quantity,
        minStock: part.minStock,
        price: part.price,
      },
    });
  }
}
