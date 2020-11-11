import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrdersClosedRepository {
  findById(id: string): Promise<Order | undefined>;
  findOrdersClosed(): Promise<Order[] | undefined>;
  update(data: ICreateOrderDTO): Promise<void>;
}
