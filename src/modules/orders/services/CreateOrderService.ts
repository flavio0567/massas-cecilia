import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  user_id: string;
  delivery_name: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  delivery_date: Date;
  delivery_time: string;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({
    user_id,
    delivery_name,
    delivery_address1,
    delivery_address2,
    delivery_city,
    delivery_state,
    delivery_zip_code,
    delivery_date,
    delivery_time
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.create({
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

    return order;
  }
}

export default CreateOrderService;
