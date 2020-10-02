import { injectable, inject } from 'tsyringe';
import { format, parseISO } from 'date-fns';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

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
    private ordersRepository: IOrdersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
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

    const dateFormatted = format(
      new Date(order.delivery_date),
      "dd/MM/yyyy 'às'"
    );

    let delivery;

    if (is_order_delivering) {
      delivery = `entregue na ${delivery_address1} ${delivery_address2}, ${delivery_city} ${delivery_state} ${delivery_zip_code} `;
    } else {
      delivery = 'retirado na loja';
    }

    await this.notificationsRepository.create({
      content: `Novo pedido criado por ${order.delivery_name} para ser ${delivery}, em ${dateFormatted} ${order.delivery_time}h`,
      order_id: order.id,
      read: false
    });

    return order;
  }
}

export default CreateOrderService;
