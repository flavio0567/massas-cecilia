import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';
import ProductActivateController from '../controllers/ProductActivateController';
import ProductAvatarController from '../controllers/ProductAvatarController';


const productsRouter = Router();
const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();
const productActivateController = new ProductActivateController();
const productAvatarController = new ProductAvatarController();

productsRouter.get('/', async (req, res) => {
  const productsRepository = new ProductsRepository();

  const product = await productsRepository.findProducts();

  return res.json({ product: classToClass(product) });
});

productsRouter.get('/family', async (req, res) => {
  const productsRepository = new ProductsRepository();

  const product = await productsRepository.findFamilyProducts();

  return res.json({ product: classToClass(product) });
});

productsRouter.get('/category', async (req, res) => {
  const productsRepository = new ProductsRepository();

  const { product_family } = req.query;
  const product = await productsRepository.findProductsCategory(
    Number(product_family)
  );

  return res.json({ product: classToClass(product) });
});

productsRouter.get('/sub-category', async (req, res) => {
  const productsRepository = new ProductsRepository();

  const { product_family, category } = req.query;

  const product = await productsRepository.findProductsSubCategory(
    Number(product_family),
    Number(category)
  );

  return res.json(product);
});

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

productsRouter.get(
  '/code/:code',
  // ensureAuthenticated,
  celebrate({ [Segments.PARAMS]: { code: Joi.number().required() } }),
  async (req, res) => {
    const { code } = req.params;
    const productsRepository = new ProductsRepository();
    const product = await productsRepository.findByCode(code);

    return res.json({ product: classToClass(product) });
  }
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      sales_price: Joi.number().required(),
      unit: Joi.string().required(),
      amount: Joi.string().default(0),
      barcode: Joi.number(),
      ncm: Joi.number(),
      is_inactive: Joi.number().default(0),
      product_family: Joi.number().required(),
      category: Joi.number().default(0),
      sub_category: Joi.number().default(0)
    }
  }),
  productsController.create
);

productsRouter.put(
  '/:product_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      unit: Joi.string().required(),
      sales_price: Joi.number().required(),
      amount: Joi.number(),
      is_inactive: Joi.number(),
      product_family: Joi.number(),
      category: Joi.number(),
      sub_category: Joi.number()
    }
  }),
  productsController.update
);

productsRouter.patch(
  '/activate/:product_id',
  ensureAuthenticated,
  productActivateController.update
);

productsRouter.patch(
  '/avatar/:product_id',
  ensureAuthenticated,
  upload.single('avatar'),
  productAvatarController.update,
);

export default productsRouter;
