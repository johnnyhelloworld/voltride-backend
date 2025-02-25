import { Order } from '../../domain/entities/order.entity';

export interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
}
