/* eslint-disable @typescript-eslint/require-await */
import { Scooter } from '../../../domain/entities/scooter.entity';
import { ScooterRepository } from '../../../application/repositories/scooter.repository';

export class InMemoryScooterRepository implements ScooterRepository {
  private scooters: Scooter[] = [];

  async findById(id: string): Promise<Scooter | null> {
    return this.scooters.find((scooter) => scooter.id === id) || null;
  }

  async save(scooter: Scooter): Promise<void> {
    this.scooters.push(scooter);
  }

  async update(scooter: Scooter): Promise<void> {
    const index = this.scooters.findIndex((s) => s.id === scooter.id);
    if (index !== -1) this.scooters[index] = scooter;
  }

  async delete(id: string): Promise<void> {
    this.scooters = this.scooters.filter((s) => s.id !== id);
  }
}
