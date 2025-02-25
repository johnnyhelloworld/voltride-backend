import { InMemoryMaintenanceRepository } from '../../../infrastructure/database/in-memory/maintenance.repository.impl';
import { ScheduleMaintenanceUseCase } from '../maintenance/schedule-maintenance.use-case';

describe('ScheduleMaintenanceUseCase', () => {
  it('should schedule a new maintenance', async () => {
    const maintenanceRepository = new InMemoryMaintenanceRepository();
    const scheduleMaintenanceUseCase = new ScheduleMaintenanceUseCase(
      maintenanceRepository,
    );

    const maintenance = await scheduleMaintenanceUseCase.execute({
      scooterId: '1',
      type: 'preventive',
      cost: 50,
      partsReplaced: [],
      notes: 'Battery check',
    });

    expect(maintenance).toMatchObject({
      scooterId: '1',
      description: 'Battery check',
    });
  });
});
