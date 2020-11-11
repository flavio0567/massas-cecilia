import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateOrderClosedService from '@modules/orders/services/UpdateOrderClosedService';
import OrdersClosedRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

export default class OrdersController {
  public async findOrders(req: Request, res: Response): Promise<Response> {
    const ordersClosedRepository = new OrdersClosedRepository();

    const orders = await ordersClosedRepository.findOrdersDetail()

    return res.json(orders);
  }

  public async findOrdersClosed(req: Request, res: Response): Promise<Response> {
    const ordersClosedRepository = new OrdersClosedRepository();

    const orders = await ordersClosedRepository.findOrdersClosed()

    return res.json(orders);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateOrder = container.resolve(UpdateOrderClosedService);

    const updateOrderClosed = await updateOrder.execute({ id });

    return res.json(updateOrderClosed);
  }
}
