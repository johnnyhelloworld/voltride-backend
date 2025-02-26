import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentReportRepository } from '../../../application/repositories/incident-report.repository';
import { IncidentReport } from '../../../domain/entities/incident-report';

@Injectable()
export class PrismaIncidentReportRepository
  implements IncidentReportRepository
{
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IncidentReport[]> {
    const reports = await this.prisma.incidentReport.findMany();
    return reports.map(
      (report) =>
        new IncidentReport(
          report.id,
          report.scooterId,
          report.userId,
          report.description,
          report.reportedAt,
          report.status,
          report.severity,
          report.location,
          report.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<IncidentReport | null> {
    const report = await this.prisma.incidentReport.findUnique({
      where: { id },
    });
    if (!report) return null;
    return new IncidentReport(
      report.id,
      report.scooterId,
      report.userId,
      report.description,
      report.reportedAt,
      report.status,
      report.severity,
      report.location,
      report.createdAt,
    );
  }

  async save(report: IncidentReport): Promise<void> {
    await this.prisma.incidentReport.create({
      data: {
        scooterId: report.scooterId,
        userId: report.userId,
        description: report.description,
        reportedAt: report.reportedAt,
        status: report.status,
        severity: report.severity,
        location: report.location,
      },
    });
  }

  async update(report: IncidentReport): Promise<void> {
    await this.prisma.incidentReport.update({
      where: { id: report.id },
      data: {
        status: report.status,
      },
    });
  }
}
