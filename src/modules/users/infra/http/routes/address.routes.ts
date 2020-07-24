import Router from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AppError from '@shared/errors/AppError';

import UsersAddressController from '../controllers/UsersAddressController';
import UserAddressesRepository from '../../typeorm/repositories/UsersAddressRepository';

const userAddressRouter = Router();
const usersAddressController = new UsersAddressController();

interface CEP {
  cep: string | number;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

userAddressRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: { userCep: Joi.string().required() } }),
  async (req, res) => {
    const userAddressesRepository = new UserAddressesRepository();
    let address: CEP | null | void;

    const userCep = req.query.userCep as string | number;

    if (!userCep) {
      throw new AppError('Too many requests', 429);
    }

    address = await userAddressesRepository.findByCep(userCep);

    return res.json(address);
  }
);

userAddressRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.required()
    }
  }),
  usersAddressController.create
);

export default userAddressRouter;
