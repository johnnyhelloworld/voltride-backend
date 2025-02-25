import { Stock } from '../../domain/entities/stock.entity';

export interface StockRepository {
  findByPartName(partName: string): Promise<Stock | null>;
  update(stock: Stock): Promise<void>;
  create(stock: Stock): Promise<Stock>;
}
