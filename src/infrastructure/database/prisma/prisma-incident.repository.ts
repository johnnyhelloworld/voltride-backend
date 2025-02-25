/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentRepository } from '../../../application/repositories/incident.repository';
import { Incident } from '../../../domain/entities/incident.entity';

@Injectable()
export class PrismaIncidentRepository implements IncidentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByScooterId(scooterId: string): Promise<Incident[]> {
    const incidents = await this.prisma.incident.findMany({
      where: { scooterId },
    });
    return incidents.map(
      (incident) =>
        new Incident(
          incident.id,
          incident.scooterId,
          incident.description,
          incident.reportedAt,
          incident.resolvedAt,
          incident.status,
          incident.underWarranty,
          incident.immobilizationDuration,
          incident.warrantyExpiresAt,
          incident.immobilizedDays,
        ),
    );
  }

  async findById(id: string): Promise<Incident | null> {
    const incident = await this.prisma.incident.findUnique({
      where: { id },
    });
    if (!incident) return null;
    return new Incident(
      incident.id,
      incident.scooterId,
      incident.description,
      incident.reportedAt,
      incident.resolvedAt,
      incident.status,
      incident.underWarranty,
      incident.immobilizationDuration,
      incident.warrantyExpiresAt,
      incident.immobilizedDays,
    );
  }

  async save(incident: Incident): Promise<void> {
    await this.prisma.incident.create({
      data: {
        id: incident.id,
        scooterId: incident.scooterId,
        description: incident.description,
        date: incident.date,
        underWarranty: incident.underWarranty,
        resolvedAt: incident.resolvedAt,
        type: incident.status,
      },
    });
  }

  async update(incident: Incident): Promise<void> {
    await this.prisma.incident.update({
      where: { id: incident.id },
      data: {
        scooterId: incident.scooterId,
        description: incident.description,
        date: incident.date,
        underWarranty: incident.underWarranty,
        resolutionDate: incident.resolutionDate,
      },
    });
  }
}
