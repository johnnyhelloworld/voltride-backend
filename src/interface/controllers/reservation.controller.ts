import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { ReservationRepository } from '../../application/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(
    @Inject('ReservationRepository')
    private reservationRepository: ReservationRepository,
  ) {}

  @Get()
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  @Post()
  async createReservation(
    @Body()
    body: {
      scooterId: string;
      userId: string;
      startTime: string;
      endTime: string;
      location: string;
    },
  ): Promise<void> {
    const reservation = new Reservation(
      crypto.randomUUID(),
      body.scooterId,
      body.userId,
      new Date(body.startTime),
      new Date(body.endTime),
      body.location,
    );
    await this.reservationRepository.save(reservation);
  }
}
