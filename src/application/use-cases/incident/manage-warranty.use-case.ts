import { Inject, Injectable } from '@nestjs/common';
import { IncidentRepository } from '../../repositories/incident.repository';

@Injectable()
export class ManageWarrantyUseCase {
  constructor(
    @Inject('IncidentRepository')
    private incidentRepository: IncidentRepository,
  ) {}

  async execute(input: {
    incidentId: string;
    resolvedAt?: Date;
    status: 'in progress' | 'resolved';
    warrantyExpiresAt?: Date; // Nouvelle propriété pour la date de garantie
  }): Promise<void> {
    const incident = await this.incidentRepository.findById(input.incidentId);
    if (!incident) throw new Error('Incident not found');

    // Mise à jour du statut
    incident.status = input.status;

    // Si l'incident est résolu, on met à jour les infos pertinentes
    if (input.status === 'resolved' && input.resolvedAt) {
      incident.resolvedAt = input.resolvedAt;
      incident.immobilizedDays = this.calculateImmobilizationDays(
        incident.reportedAt,
        input.resolvedAt,
      );
    }

    // Mettre à jour la date d'expiration de la garantie si fournie
    if (input.warrantyExpiresAt) {
      incident.warrantyExpiresAt = input.warrantyExpiresAt;
    }

    await this.incidentRepository.update(incident);
  }

  private calculateImmobilizationDays(
    reportedAt: Date,
    resolvedAt: Date,
  ): number {
    const diffInMs = resolvedAt.getTime() - reportedAt.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }
}
