import { Controller, Post, Body } from '@nestjs/common';
import { ScheduleMaintenanceUseCase } from '../../application/use-cases/maintenance/schedule-maintenance.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(private scheduleMaintenanceUseCase: ScheduleMaintenanceUseCase) {}

  @Post('schedule')
  @ApiOperation({ summary: 'Schedule a maintenance' })
  async scheduleMaintenance(
    @Body()
    body: {
      scooterId: string;
      type: 'preventive' | 'corrective';
      cost: number;
      partsReplaced: string[];
      notes: string;
    },
  ) {
    return await this.scheduleMaintenanceUseCase.execute(body);
  }

  // @Get(':scooterId/next')
  // async getNextMaintenance(
  //   @Param('scooterId') scooterId: string,
  // ): Promise<Date | null> {
  //   return await this.scheduleMaintenanceUseCase.execute(scooterId);
  // }
}
