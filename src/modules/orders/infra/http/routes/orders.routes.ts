import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
// import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';
// import UsersController from '@modules/users/infra/http/controllers/UsersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

// const userController = new UsersController();

ordersRouter.get('/', async (req, res) => {
  const ordersRepository = new OrdersRepository();

  const product = await ordersRepository.findOrders();

  return res.json({ product: classToClass(product) });
});

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

ordersRouter.post('/create', ordersController.create);

export default ordersRouter;
