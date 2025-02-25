import { Maintenance } from '../../domain/entities/maintenance.entity';

export interface MaintenanceRepository {
  findByScooterId(scooterId: string): Promise<Maintenance[]>;
  save(maintenance: Maintenance): Promise<void>;
}
