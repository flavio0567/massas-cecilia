import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import { celebrate, Joi, Segments } from 'celebrate';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';
import UpdateProductAvatarService from '@modules/products/services/UpdateProductAvatarService';

const productsRouter = Router();
const upload = multer(uploadConfig);
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
      ncm: Joi.number().required(),
      is_active: Joi.number().default(0)
    }
  }),
  productsController.create
);

productsRouter.patch(
  '/avatar/:product_id',
  upload.single('avatar'),
  async (req, res) => {
    const updateProductAvatar = new UpdateProductAvatarService();

    const product = await updateProductAvatar.execute({
      product_id: req.params.product_id,
      avatarFilename: req.file.filename
    });

    return res.json(product);
  }
);

export default productsRouter;
