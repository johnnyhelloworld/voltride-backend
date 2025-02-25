import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../../../application/repositories/maintenance.repository';

@Injectable()
export class PrismaMaintenanceRepository implements MaintenanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByScooterId(scooterId: string): Promise<Maintenance[]> {
    const maintenances = await this.prisma.maintenance.findMany({
      where: { scooterId },
    });
    return maintenances.map(
      (m) =>
        new Maintenance(
          m.id,
          m.scooterId,
          m.type as 'preventive' | 'corrective',
          m.date,
          m.cost,
          m.partsReplaced,
          m.notes,
        ),
    );
  }

  async save(maintenance: Maintenance): Promise<void> {
    await this.prisma.maintenance.create({
      data: {
        id: maintenance.id,
        scooterId: maintenance.scooterId,
        type: maintenance.type ?? 'preventive',
        date: maintenance.date,
        cost: maintenance.cost ?? 0,
        partsReplaced: maintenance.partsReplaced,
        notes: maintenance.notes ?? '',
      },
    });
  }
}
