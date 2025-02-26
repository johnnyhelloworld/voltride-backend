import { IncidentReport } from '../../domain/entities/incident-report';

export interface IncidentReportRepository {
  findAll(): Promise<IncidentReport[]>;
  findById(id: string): Promise<IncidentReport | null>;
  save(report: IncidentReport): Promise<void>;
  update(report: IncidentReport): Promise<void>;
}
