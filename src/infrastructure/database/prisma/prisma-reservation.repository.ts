import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationRepository } from '../../../application/repositories/reservation.repository';
import { Reservation } from '../../../domain/entities/reservation.entity';

@Injectable()
export class PrismaReservationRepository implements ReservationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Reservation[]> {
    const reservations = await this.prisma.reservation.findMany();
    return reservations.map(
      (res) =>
        new Reservation(
          res.id,
          res.scooterId,
          res.userId,
          res.startTime,
          res.endTime,
          res.location,
          res.status,
          res.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<Reservation | null> {
    const res = await this.prisma.reservation.findUnique({ where: { id } });
    if (!res) return null;
    return new Reservation(
      res.id,
      res.scooterId,
      res.userId,
      res.startTime,
      res.endTime,
      res.location,
      res.status,
      res.createdAt,
    );
  }

  async save(reservation: Reservation): Promise<void> {
    await this.prisma.reservation.create({
      data: {
        scooterId: reservation.scooterId,
        userId: reservation.userId,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        location: reservation.location,
        status: reservation.status,
      },
    });
  }

  async update(reservation: Reservation): Promise<void> {
    await this.prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        location: reservation.location,
        status: reservation.status,
      },
    });
  }
}
