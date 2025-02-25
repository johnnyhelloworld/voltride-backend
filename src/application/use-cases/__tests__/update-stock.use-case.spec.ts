import { InMemoryStockRepository } from '../../../infrastructure/database/in-memory/stock.repository.impl';
import { UpdateStockUseCase } from '../stock/update-stock.use-case';

describe('UpdateStockUseCase', () => {
  it('should update stock for an existing part', async () => {
    const stockRepository = new InMemoryStockRepository();
    const updateStockUseCase = new UpdateStockUseCase(stockRepository);

    await updateStockUseCase.execute({
      partName: 'Battery',
      quantity: 10,
    });
    const updatedStock = await stockRepository.findByPartName('Battery');

    expect(updatedStock).toEqual({
      id: '1',
      partName: 'Battery',
      quantity: 10,
    });
  });
});
