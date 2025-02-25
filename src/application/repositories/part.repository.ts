import { Part } from '../../domain/entities/part.entity';

export interface PartRepository {
  findAll(): Promise<Part[]>;
  findById(id: string): Promise<Part | null>;
  findByName(name: string): Promise<Part | null>;
  updateQuantity(partId: string, quantity: number): Promise<void>;
  save(part: Part): Promise<void>;
}
