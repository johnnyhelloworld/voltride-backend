/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ScheduleMaintenanceUseCase } from '../../application/use-cases/maintenance/schedule-maintenance.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotifyUpcomingMaintenanceUseCase } from 'src/application/use-cases/maintenance/notify-upcoming-maintenance.use-case';
import { NotificationService } from 'src/application/services/notification.service';
import { Maintenance } from 'src/domain/entities/maintenance.entity';

@ApiTags('Maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private scheduleMaintenanceUseCase: ScheduleMaintenanceUseCase,
    private notifyUpcomingMaintenanceUseCase: NotifyUpcomingMaintenanceUseCase,
    private readonly notificationService: NotificationService,
  ) {}

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

  @Post('notify')
  async notifyUpcomingMaintenance(): Promise<void> {
    await this.notifyUpcomingMaintenanceUseCase.execute();
  }

  @Post('send')
  async sendTestEmail(
    @Body() body: { email: string; subject: string; message: string },
  ): Promise<string> {
    await this.notificationService.sendEmail(
      body.email,
      body.subject,
      body.message,
    );
    return 'Email sent successfully!';
  }

  // @Get(':scooterId/next')
  // async getNextMaintenance(
  //   @Param('scooterId') scooterId: string,
  // ): Promise<Date | null> {
  //   return await this.scheduleMaintenanceUseCase.execute(scooterId);
  // }

  // @Get(':scooterId/history')
  // async getMaintenanceHistory(
  //   @Param('scooterId') scooterId: string,
  // ): Promise<Maintenance[]> {
  //   return await this.scheduleMaintenanceUseCase.execute(scooterId);
  // }
}
