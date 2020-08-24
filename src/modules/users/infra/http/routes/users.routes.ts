import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

import { classToClass } from 'class-transformer';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', async (req, res) => {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findUsers();

  return res.json({ user: classToClass(user) });
});

usersRouter.get(
  '/:id',
  // ensureAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  async (req, res) => {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    return res.json({ user: classToClass(user) });
  }
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      avatar: Joi.string(),
      name: Joi.string().required(),
      mobile: Joi.string(),
      email: Joi.string()
        .email()
        .allow(''),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  usersController.create
);

export default usersRouter;
