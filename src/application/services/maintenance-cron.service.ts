import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotifyUpcomingMaintenanceUseCase } from '../use-cases/maintenance/notify-upcoming-maintenance.use-case';

@Injectable()
export class MaintenanceCronService {
  constructor(
    private notifyUpcomingMaintenanceUseCase: NotifyUpcomingMaintenanceUseCase,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    console.log('Vérification des maintenances à venir...');
    await this.notifyUpcomingMaintenanceUseCase.execute();
  }
}
