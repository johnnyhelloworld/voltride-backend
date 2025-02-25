/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Scooter } from '../../../domain/entities/scooter.entity';
import { ScooterRepository } from '../../../application/repositories/scooter.repository';

@Injectable()
export class PrismaScooterRepository implements ScooterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Scooter | null> {
    const scooter = await this.prisma.scooter.findUnique({ where: { id } });
    if (!scooter) return null;
    return new Scooter(
      scooter.id,
      scooter.model,
      scooter.mileage,
      scooter.batteryCycles,
      scooter.lastMaintenanceDate,
      scooter.status as 'active' | 'maintenance' | 'out_of_service',
      scooter.ownerId || '',
    );
  }

  async findAll(): Promise<Scooter[]> {
    const scooters = await this.prisma.scooter.findMany();
    return scooters.map(
      (scooter) =>
        new Scooter(
          scooter.id,
          scooter.model,
          scooter.mileage,
          scooter.batteryCycles,
          scooter.lastMaintenanceDate,
          scooter.status as 'active' | 'maintenance' | 'out_of_service',
          scooter.ownerId || '',
        ),
    );
  }

  async update(scooter: Scooter): Promise<void> {
    await this.prisma.scooter.update({
      where: { id: scooter.id },
      data: {
        model: scooter.model,
        mileage: scooter.mileage,
        batteryCycles: scooter.batteryCycles,
        lastMaintenanceDate: scooter.lastMaintenanceDate,
        status: scooter.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.scooter.delete({ where: { id } });
  }

  async save(scooter: Scooter): Promise<void> {
    console.log('📤 Attempting to save scooter:', scooter); // Étape 1

    try {
      const result = await this.prisma.scooter.create({
        data: {
          id: scooter.id,
          model: scooter.model,
          mileage: scooter.mileage,
          batteryCycles: scooter.batteryCycles,
          lastMaintenanceDate: scooter.lastMaintenanceDate,
          status: scooter.status,
        },
      });
      console.log('✅ Scooter saved:', result); // Étape 2
    } catch (error) {
      console.error('❌ Error saving scooter:', error); // Étape 3
    }
  }
}
