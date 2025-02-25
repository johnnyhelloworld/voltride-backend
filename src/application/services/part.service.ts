import { Inject, Injectable } from '@nestjs/common';
import { PartRepository } from '../repositories/part.repository';
import { NotificationService } from './notification.service';

@Injectable()
export class PartService {
  constructor(
    @Inject('PartRepository') private partRepository: PartRepository,
    private notificationService: NotificationService,
  ) {}

  async updateQuantity(partId: string, quantity: number): Promise<void> {
    const part = await this.partRepository.findById(partId);
    if (!part) throw new Error('Part not found');

    part.quantity = quantity;
    await this.partRepository.updateQuantity(partId, quantity);

    if (part.quantity <= part.minStock) {
      await this.notificationService.notifyLowStock(part.name, part.quantity);
    }
  }
}
