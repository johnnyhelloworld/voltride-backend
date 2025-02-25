/* eslint-disable @typescript-eslint/require-await */
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../../../application/repositories/maintenance.repository';

export class InMemoryMaintenanceRepository implements MaintenanceRepository {
  private maintenances: Maintenance[] = [];

  async findByScooterId(scooterId: string): Promise<Maintenance[]> {
    return this.maintenances.filter((m) => m.scooterId === scooterId);
  }

  async save(maintenance: Maintenance): Promise<void> {
    this.maintenances.push(maintenance);
  }
}
