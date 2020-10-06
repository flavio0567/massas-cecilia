import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  id: string;
  delivery_name: string;
  delivery_mobile: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  delivery_date: Date;
  delivery_time: string;
  order_total: number;
  is_order_delivering: number;
  is_delivered: number;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({
    id,
    delivery_name,
    delivery_mobile,
    delivery_address1,
    delivery_address2,
    delivery_city,
    delivery_state,
    delivery_zip_code,
    delivery_date,
    delivery_time,
    order_total,
    is_order_delivering,
    is_delivered
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 401);
    }

    order.delivery_name = delivery_name;
    order.delivery_mobile = delivery_mobile;
    order.delivery_address1 = delivery_address1;
    order.delivery_address2 = delivery_address2;
    order.delivery_city = delivery_city;
    order.delivery_state = delivery_state;
    order.delivery_zip_code = delivery_zip_code;
    order.delivery_date = delivery_date;
    order.delivery_time = delivery_time;
    order.order_total = order_total;
    order.is_order_delivering = is_order_delivering;
    is_delivered = is_delivered;

    await this.ordersRepository.update(order);

    return order;
  }
}

export default UpdateOrderService;
