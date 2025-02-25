import { Inject, Injectable } from '@nestjs/common';
import { ScooterRepository } from '../../repositories/scooter.repository';
import { NotificationService } from '../../services/notification.service';
import { MaintenanceScheduler } from '../../services/maintenance-scheduler';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class NotifyUpcomingMaintenanceUseCase {
  constructor(
    @Inject('ScooterRepository') private scooterRepository: ScooterRepository,
    private notificationService: NotificationService,
    private maintenanceScheduler: MaintenanceScheduler,
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async execute(): Promise<void> {
    const scooters = await this.scooterRepository.findAll();

    for (const scooter of scooters) {
      const nextMaintenanceDate = MaintenanceScheduler.calculateNextMaintenance(
        scooter.model,
        scooter.lastMaintenanceDate,
        scooter.batteryCycles,
        scooter.mileage,
      );

      if (
        nextMaintenanceDate &&
        this.isWithinReminderPeriod(nextMaintenanceDate)
      ) {
        const user = await this.userRepository.findById(scooter.ownerId);
        if (user) {
          await this.notificationService.sendEmail(
            user.email,
            `Rappel de maintenance pour votre scooter ${scooter.model}`,
            `Votre prochain entretien est prévu pour le ${nextMaintenanceDate.toLocaleDateString()}.`,
          );
        } else {
          console.warn(`Aucun utilisateur trouvé pour l'ID ${scooter.ownerId}`);
        }
      }
    }
  }

  private isWithinReminderPeriod(date: Date): boolean {
    const now = new Date();
    const reminderThreshold = 7; // par exemple, 7 jours avant l'échéance
    const diffInDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diffInDays <= reminderThreshold;
  }
}
