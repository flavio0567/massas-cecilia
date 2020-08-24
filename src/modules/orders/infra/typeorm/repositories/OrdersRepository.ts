import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findOrders(): Promise<Order[] | undefined> {
    const findOrder = await this.ormRepository.find({
      order: {
        id: 'ASC'
      }
    });
    return findOrder;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = await this.ormRepository.findOne(id);

    return findOrder;
  }

  public async create({
    user_id,
    delivery_name,
    delivery_address1,
    delivery_address2,
    delivery_city,
    delivery_state,
    delivery_zip_code,
    delivery_date,
    delivery_time
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      user_id,
      delivery_name,
      delivery_address1,
      delivery_address2,
      delivery_city,
      delivery_state,
      delivery_zip_code,
      delivery_date,
      delivery_time
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}

export default OrdersRepository;
