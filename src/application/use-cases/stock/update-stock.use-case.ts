import { Inject } from '@nestjs/common';
import { StockRepository } from '../../repositories/stock.repository';

export class UpdateStockUseCase {
  constructor(
    @Inject('StockRepository') private stockRepository: StockRepository,
  ) {}

  async execute(input: { partName: string; quantity: number }): Promise<void> {
    // Try to find the stock based on partName
    let stock = await this.stockRepository.findByPartName(input.partName);

    // If stock doesn't exist, create a new one
    if (!stock) {
      console.log(
        `Stock not found for partName: ${input.partName}. Creating a new stock.`,
      );
      stock = await this.stockRepository.create({
        partName: input.partName,
        quantity: input.quantity,
        threshold: 0,
        id: '',
      });
      console.log(`New stock created: ${JSON.stringify(stock)}`);
    } else {
      // If stock exists, update its quantity
      console.log(
        `Stock found for partName: ${input.partName}. Updating quantity.`,
      );
      stock.quantity = input.quantity;
      await this.stockRepository.update(stock);
      console.log(`Stock updated: ${JSON.stringify(stock)}`);
    }
  }
}
