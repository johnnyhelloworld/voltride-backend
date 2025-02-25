import { Controller, Post, Body } from '@nestjs/common';
import { UpdateStockUseCase } from '../../application/use-cases/stock/update-stock.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stocks')
export class StockController {
  constructor(private updateStockUseCase: UpdateStockUseCase) {}

  @Post('update')
  @ApiOperation({ summary: 'Update stock' })
  async updateStock(
    @Body() body: { id: string; partName: string; quantity: number },
  ) {
    return await this.updateStockUseCase.execute(body);
  }
}
