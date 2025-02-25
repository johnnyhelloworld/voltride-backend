import { Inject, Injectable } from '@nestjs/common';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../../repositories/maintenance.repository';
import { MaintenanceScheduler } from '../../services/maintenance-scheduler';
import { ScooterRepository } from '../../repositories/scooter.repository';
import { PartRepository } from 'src/application/repositories/part.repository';

@Injectable()
export class ScheduleMaintenanceUseCase {
  constructor(
    @Inject('MaintenanceRepository')
    private maintenanceRepository: MaintenanceRepository,

    @Inject('ScooterRepository')
    private scooterRepository: ScooterRepository,

    @Inject('PartRepository')
    private partRepository: PartRepository,

    private maintenanceScheduler: MaintenanceScheduler,
  ) {}

  async execute(input: {
    scooterId: string;
    type: 'preventive' | 'corrective';
    cost: number;
    partsReplaced: string[];
    notes: string;
  }): Promise<void> {
    // Crée la maintenance actuelle
    const maintenance = new Maintenance(
      crypto.randomUUID(),
      input.scooterId,
      input.type,
      new Date(),
      input.cost,
      input.partsReplaced,
      input.notes,
    );

    await this.maintenanceRepository.save(maintenance);

    for (const partName of input.partsReplaced) {
      const part = await this.partRepository.findByName(partName);
      if (part) {
        const newQuantity = part.quantity - 1;
        await this.partRepository.updateQuantity(part.id, newQuantity);

        if (newQuantity <= part.minStock) {
          console.warn(
            `Alerte stock faible : ${partName} (restant : ${newQuantity})`,
          );
        }
      }
    }

    // Récupère le scooter pour calculer la prochaine maintenance
    const scooter = await this.scooterRepository.findById(input.scooterId);
    if (!scooter) throw new Error('Scooter not found');

    const nextMaintenanceDate = MaintenanceScheduler.calculateNextMaintenance(
      scooter.model,
      new Date(), // date actuelle ou dernière maintenance
      scooter.batteryCycles,
      scooter.mileage,
    );

    console.log('Prochaine maintenance prévue pour :', nextMaintenanceDate);
  }
}
