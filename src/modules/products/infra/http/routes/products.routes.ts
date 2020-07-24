import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import AppError from '@shared/errors/AppError';
import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';
import UpdateProductAvatarService from '@modules/products/services/UpdateProductAvatarService';

import ActivateProductController from '../controllers/ActivateProductController';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();
const activateProductController = new ActivateProductController();

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
  activateProductController.update
);

productsRouter.patch(
  '/avatar/:product_id',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { product_id } = req.params;
    try {
      const updateProductAvatar = new UpdateProductAvatarService();

      const product = await updateProductAvatar.execute({
        product_id,
        avatarFilename: req.file.filename
      });

      return res.json({ product: classToClass(product) });
    } catch (err) {
      throw new AppError('Error uploading product avatar.', err);
    }
  }
);

export default productsRouter;
