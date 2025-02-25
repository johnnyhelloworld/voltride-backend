import { Inject } from '@nestjs/common';
import { Scooter } from '../../../domain/entities/scooter.entity';
import { ScooterRepository } from '../../repositories/scooter.repository';

export class CreateScooterUseCase {
  constructor(
    @Inject('ScooterRepository') private scooterRepository: ScooterRepository,
  ) {}

  async execute(input: {
    model: string;
    mileage: number;
    batteryCycles: number;
  }): Promise<void> {
    const scooter = new Scooter(
      crypto.randomUUID(),
      input.model,
      input.mileage,
      input.batteryCycles,
      new Date(),
      'active',
    );
    console.log('Scooter trouvé:', scooter);
    await this.scooterRepository.save(scooter);
  }
}
