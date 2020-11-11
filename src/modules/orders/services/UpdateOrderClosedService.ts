import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersClosedRepository from '../repositories/IOrdersClosedRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  id: string;
}

@injectable()
class UpdateOrderClosedService {
  constructor(
    @inject('OrdersClosedRepository')
    private ordersClosedRepository: IOrdersClosedRepository
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<Order> {
    const order = await this.ordersClosedRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 401);
    }

    order.is_delivered = 1;

    await this.ordersClosedRepository.update(order);

    return order;
  }
}

export default UpdateOrderClosedService;
