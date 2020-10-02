import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findOrdersDetail(): Promise<Order[] | undefined> {
    const findOrder = await this.ormRepository.find({
      where: {
        is_delivered: 0
      },
      order: {
        delivery_date: 'ASC',
        delivery_time: 'ASC'
      },
      relations: ['ordersdetail']
    });

    return findOrder;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = await this.ormRepository.findOne(id);

    return findOrder;
  }

  public async create({
    is_order_delivering,
    delivery_name,
    delivery_mobile,
    delivery_address1,
    delivery_address2,
    delivery_city,
    delivery_state,
    delivery_zip_code,
    delivery_date,
    delivery_time,
    order_total
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();
    order.is_order_delivering = is_order_delivering;
    order.delivery_name = delivery_name;
    order.delivery_mobile = delivery_mobile;
    order.delivery_address1 = delivery_address1!;
    order.delivery_address2 = delivery_address2!;
    order.delivery_city = delivery_city!;
    order.delivery_state = delivery_state!;
    order.delivery_zip_code = delivery_zip_code!;
    order.delivery_date = delivery_date;
    order.delivery_time = delivery_time;
    order.order_total = order_total;

    return this.ormRepository.save(order);
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}

export default OrdersRepository;
