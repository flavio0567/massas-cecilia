import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import UpdatedOrderDetailService from '@modules/orders/services/UpdateOrderDetailService';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import OrdersDetailRepository from '@modules/orders/infra/typeorm/repositories/OrdersDetailRepository';

export default class OrdersController {
  public async findOrders(req: Request, res: Response): Promise<Response> {
    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.findOrdersDetail()

    return res.json(orders);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, mobile, deliveryLocalization } = req.body;

    const {
      cep,
      state,
      city,
      neighborhood,
      street,
      numberAddress,
      complementAddress
    } = deliveryLocalization;

    // User

    // const createUser = container.resolve(CreateUserService);

    // await createUser.execute({
    //   name,
    //   mobile,
    //   avatar: '',
    //   email: '',
    //   password: '',
    //   is_admin: 0,
    //   is_active: 1
    // });

    // Order

    let address;

    if (street) {
      address = `${street}, ${numberAddress} ${complementAddress}`;
    } else {
      address = null;
    }

    const { order_total, isOrderDelivering, deliveryDateTime } = req.body;

    const { deliveryDate, deliveryTime } = deliveryDateTime;

    const createOrder = container.resolve(CreateOrderService);

    const newOrder = await createOrder.execute({
      delivery_name: name,
      delivery_mobile: mobile,
      is_order_delivering: isOrderDelivering,
      delivery_address1: address,
      delivery_address2: neighborhood,
      delivery_city: city,
      delivery_state: state,
      delivery_zip_code: cep,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      order_total
    });

    // Detail

    const { orderDetail } = req.body;

    const ordersDetailRepository = new OrdersDetailRepository();

    try {
      orderDetail.map(
        (element: {
          id: string;
          sales_price: number;
          unit: string;
          amount: number;
          quantity: number;
          product_name: string;
          packing: string;
        }) => {
          ordersDetailRepository.create({
            order_id: newOrder.id,
            product_id: element.id,
            sales_price: Number(element.sales_price),
            unit: element.unit,
            amount: element.amount,
            quantity: element.quantity,
            product_name: element.product_name,
            packing: element.packing
          });
        }
      );
    } catch (err) {
      throw new AppError('Error creating order details.', err);
    }

    return res.json(newOrder);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
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
      order_total } = req.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const updatedOrder = await updateOrder.execute({
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
    });

    // Detail

    const updateOrderDetail = container.resolve(UpdatedOrderDetailService);

    const { ordersdetail } = req.body;

    try {
      ordersdetail.map(
        async (element: {
          id: string;
          order_id: string;
          product_id: string;
          sales_price: string;
          unit: string;
          amount: number;
          quantity: number;
          product_name: string;
        }) => {
          const updatedOrderDetail = await updateOrderDetail.execute({
            id: element.id,
            order_id: element.order_id,
            product_id: element.product_id,
            sales_price: Number(element.sales_price),
            unit: element.unit,
            amount: element.amount,
            quantity: element.quantity,
            product_name: element.product_name
          });
          return updatedOrderDetail;
        }
      );
    } catch (err) {
      throw new AppError('Error creating order details.', err);
    }

    return res.json(updatedOrder);
  }
}
