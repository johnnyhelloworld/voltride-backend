import { Controller, Post, Body } from '@nestjs/common';
import { CreateScooterUseCase } from '../../application/use-cases/scooter/create-scooter.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Scooters')
@Controller('scooters')
export class ScooterController {
  constructor(private createScooterUseCase: CreateScooterUseCase) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new scooter' })
  async createScooter(
    @Body() body: { model: string; mileage: number; batteryCycles: number },
  ) {
    return await this.createScooterUseCase.execute(body);
  }
}
