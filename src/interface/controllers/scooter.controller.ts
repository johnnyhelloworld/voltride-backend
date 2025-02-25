import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateScooterUseCase } from '../../application/use-cases/scooter/create-scooter.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/application/guards/roles.guard';
import { Roles } from 'src/application/decorators/roles.decorator';

@ApiTags('Scooters')
@Controller('scooters')
// @UseGuards(RolesGuard)
export class ScooterController {
  constructor(private createScooterUseCase: CreateScooterUseCase) {}

  // @Roles('ADMIN')
  @Post('create')
  @ApiOperation({ summary: 'Create a new scooter' })
  async createScooter(
    @Body()
    body: {
      model: string;
      mileage: number;
      batteryCycles: number;
      ownerId: string;
      isImmobilized: boolean;
    },
  ) {
    return await this.createScooterUseCase.execute(body);
  }
}
