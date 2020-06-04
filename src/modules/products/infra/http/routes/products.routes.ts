import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductsRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  async (req, res) => {
    const { id } = req.params;

    const productsRepository = new ProductsRepository();
    const product = await productsRepository.findById(id);

    return res.json(product);
  }
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      barcode: Joi.number().required(),
      unit: Joi.string().required(),
      sales_price: Joi.number().required(),
      password: Joi.string().required(),
      ncm: Joi.number().required(),
      is_active: Joi.number().default(0),
    },
  }),
  productsController.create
);

export default productsRouter;
