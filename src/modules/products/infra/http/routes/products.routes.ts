import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import paginatedResults from '@shared/infra/http/middleware/pagination';

import ProductsController from '../controllers/ProductsController';
import ProductActivateController from '../controllers/ProductActivateController';
import ProductAvatarController from '../controllers/ProductAvatarController';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();
const productActivateController = new ProductActivateController();
const productAvatarController = new ProductAvatarController();


productsRouter.get('/', paginatedResults,(req, res) => {
  return res.json({ product: res.paginatedResults });
});


productsRouter.get(
  '/search',
  celebrate({ [Segments.QUERY]: { like: Joi.string().required() } }),
  async (req, res) => {
    const { like } = req.query;

    const productsRepository = new ProductsRepository();
    const product = await productsRepository.searchProducts(`${like}`);

    return res.json(product);
  }
);

productsRouter.get('/family', async (req, res) => {
  const productsRepository = new ProductsRepository();

  const product = await productsRepository.findFamilyProducts();

  return res.json({ product: classToClass(product) });
});

productsRouter.get(
  '/all-in-family/:family',
celebrate({ [Segments.PARAMS]: { family: Joi.number().required() } }),
async (req, res) => {
  const { family } = req.params;

  const productsRepository = new ProductsRepository();
  const products = await productsRepository.findAllProductsFamily(Number(family));

  return res.json(products);
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
    [Segments.BODY]: Joi.object().keys({
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
    }),
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
      exception: Joi.number(),
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
