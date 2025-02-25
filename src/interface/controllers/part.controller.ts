import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartRepository } from '../../application/repositories/part.repository';
import { Part } from '../../domain/entities/part.entity';
import { PartService } from 'src/application/services/part.service';

@Controller('parts')
export class PartController {
  constructor(
    @Inject('PartRepository') private partRepository: PartRepository,
    private partService: PartService,
  ) {}

  @Get()
  async getAllParts(): Promise<Part[]> {
    return this.partRepository.findAll();
  }

  @Post()
  async createPart(
    @Body()
    body: {
      name: string;
      description: string;
      quantity: number;
      minStock: number;
      price: number;
      createdAt: Date;
      updatedAt: Date;
    },
  ): Promise<void> {
    const part = new Part(
      crypto.randomUUID(),
      body.name,
      body.description,
      body.quantity,
      body.minStock,
      body.price,
      body.createdAt,
      body.updatedAt,
    );
    await this.partRepository.save(part);
  }

  @Patch(':id/quantity')
  async updateQuantity(
    @Param('id') partId: string,
    @Body() body: { quantity: number },
  ): Promise<void> {
    await this.partService.updateQuantity(partId, body.quantity);
  }
}
