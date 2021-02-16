import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', ordersController.findOrders);

ordersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  async (req, res) => {
    const { id } = req.params;

    const ordersRepository = new OrdersRepository();
    const order = await ordersRepository.findById(id);

    return res.json({ order: classToClass(order) });
  }
);

ordersRouter.get(
  '/mobile/:delivery_mobile',
  celebrate({ [Segments.PARAMS]: { delivery_mobile: Joi.number().required() } }),
  async (req, res) => {
    const { delivery_mobile } = req.params;

    const ordersRepository = new OrdersRepository();
    const order = await ordersRepository.findByMobile(Number(delivery_mobile));

    return res.json({ order: classToClass(order) });
  }
);

ordersRouter.post('/create', ordersController.create);

ordersRouter.put('/', ordersController.update);

export default ordersRouter;
