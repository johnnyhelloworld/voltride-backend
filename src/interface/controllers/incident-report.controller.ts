import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { IncidentReportRepository } from '../../application/repositories/incident-report.repository';
import { IncidentReport } from '../../domain/entities/incident-report';

@Controller('incident-reports')
export class IncidentReportController {
  constructor(
    @Inject('IncidentReportRepository')
    private incidentReportRepository: IncidentReportRepository,
  ) {}

  @Get()
  async getAllReports(): Promise<IncidentReport[]> {
    return this.incidentReportRepository.findAll();
  }

  @Post()
  async reportIncident(
    @Body()
    body: {
      scooterId: string;
      userId: string;
      description: string;
      severity: string;
      location: string;
    },
  ): Promise<void> {
    const report = new IncidentReport(
      crypto.randomUUID(),
      body.scooterId,
      body.userId,
      body.description,
      new Date(),
      'pending',
      body.severity,
      body.location,
    );

    await this.incidentReportRepository.save(report);
  }
}
