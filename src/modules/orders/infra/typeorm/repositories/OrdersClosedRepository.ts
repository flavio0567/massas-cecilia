import { getRepository, Repository } from 'typeorm';

import IOrdersClosedRepository from '@modules/orders/repositories/IOrdersClosedRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import Order from '../entities/Order';

class OrdersClosedRepository implements IOrdersClosedRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrderClosed = await this.ormRepository.findOne({
      where: { id },
      relations: ['ordersdetail']
    });

    return findOrderClosed;
  }

  public async findOrdersClosed(): Promise<Order[] | undefined> {
    const findOrdersClosed = await this.ormRepository.find({
      where: {
        is_delivered: 1
      },
      order: {
        updated_at: 'DESC',
      },
      relations: ['ordersdetail']
    });

    return findOrdersClosed;
  }

  public async update(order: ICreateOrderDTO): Promise<void> {
    await this.ormRepository.save(order);

    return;
  }
}

export default OrdersClosedRepository;
