import { Reservation } from '../../domain/entities/reservation.entity';

export interface ReservationRepository {
  findAll(): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<void>;
  update(reservation: Reservation): Promise<void>;
}
