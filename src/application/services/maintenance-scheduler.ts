/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaintenanceScheduler {
  // Calcul de la prochaine date de maintenance pour un scooter
  static calculateNextMaintenance(
    scooterModel,
    lastMaintenanceDate: Date,
    batteryCycles: number,
    mileage: number,
  ): Date | null {
    let nextMaintenanceDate: Date | null = null;

    // Vérification de la batterie par cycles de charge
    if (scooterModel.batteryCheckInterval) {
      const cyclesRemaining = scooterModel.batteryCheckInterval - batteryCycles;
      if (cyclesRemaining <= 0) {
        nextMaintenanceDate = nextMaintenanceDate || new Date(); // Si la batterie nécessite une vérification, prendre la date actuelle.
      }
    }

    // Révision générale basée sur la date (par exemple tous les 6 mois)
    if (scooterModel.generalCheckInterval) {
      const generalCheckDueDate = new Date(lastMaintenanceDate);
      generalCheckDueDate.setMonth(generalCheckDueDate.getMonth() + 6); // Par exemple, tous les 6 mois
      nextMaintenanceDate = nextMaintenanceDate
        ? generalCheckDueDate < nextMaintenanceDate
          ? generalCheckDueDate
          : nextMaintenanceDate
        : generalCheckDueDate;
    }

    // Révision complète basée sur la distance parcourue
    if (
      scooterModel.revisionInterval &&
      mileage >= scooterModel.revisionInterval
    ) {
      const revisionDueDate = new Date(lastMaintenanceDate);
      nextMaintenanceDate = nextMaintenanceDate || revisionDueDate;
    }

    return nextMaintenanceDate;
  }
}
