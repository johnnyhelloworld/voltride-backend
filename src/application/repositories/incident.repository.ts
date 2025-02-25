import { Incident } from '../../domain/entities/incident.entity';

export interface IncidentRepository {
  findByScooterId(scooterId: string): Promise<Incident[]>;
  findById(id: string): Promise<Incident | null>;
  save(incident: Incident): Promise<void>;
  update(incident: Incident): Promise<void>;
}
