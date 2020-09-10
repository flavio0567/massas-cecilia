import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  delivery_name: string;
  delivery_mobile: string;
  is_order_delivering: number;
  delivery_address1: string | null;
  delivery_address2: string | null;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  delivery_date: Date;
  delivery_time: string;
  order_total: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({
    delivery_name,
    delivery_mobile,
    is_order_delivering,
    delivery_address1,
    delivery_address2,
    delivery_city,
    delivery_state,
    delivery_zip_code,
    delivery_date,
    delivery_time,
    order_total
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.create({
      delivery_name,
      delivery_mobile,
      is_order_delivering,
      delivery_address1,
      delivery_address2,
      delivery_city,
      delivery_state,
      delivery_zip_code,
      delivery_date,
      delivery_time,
      order_total
    });

    return order;
  }
}

export default CreateOrderService;
