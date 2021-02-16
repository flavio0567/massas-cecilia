import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
  findByMobile(delivery_mobile: number): Promise<Order[] | undefined>;
  findOrdersDetail(): Promise<Order[] | undefined>;
  findById(id: string): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: ICreateOrderDTO): Promise<void>;
  save(product: Order): Promise<Order>;
}
