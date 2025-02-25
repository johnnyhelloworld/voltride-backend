import { Injectable, Inject } from '@nestjs/common';
import { Incident } from '../../../domain/entities/incident.entity';
import { IncidentRepository } from '../../repositories/incident.repository';
import { ScooterRepository } from '../../repositories/scooter.repository';

@Injectable()
export class ReportIncidentUseCase {
  constructor(
    @Inject('IncidentRepository')
    private incidentRepository: IncidentRepository,

    @Inject('ScooterRepository')
    private scooterRepository: ScooterRepository,
  ) {}

  async execute(input: {
    scooterId: string;
    description: string;
    underWarranty: boolean;
    immobilizationDuration: number;
    warrantyExpiresAt: Date;
    immobilizedDays: number;
  }): Promise<void> {
    const scooter = await this.scooterRepository.findById(input.scooterId);
    if (!scooter) {
      throw new Error('Scooter not found');
    }

    const incident = new Incident(
      crypto.randomUUID(),
      input.scooterId,
      input.description,
      new Date(),
      new Date(),
      'pending',
      input.underWarranty,
      input.immobilizationDuration,
      input.warrantyExpiresAt,
      input.immobilizedDays,
    );

    await this.incidentRepository.save(incident);

    // Marquer le scooter comme immobilisé si nécessaire
    scooter.isImmobilized = true;
    await this.scooterRepository.update(scooter);
  }
}
