import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

import { classToClass } from 'class-transformer';

const usersRouter = Router();
const usersController = new UsersController();

// usersRouter.use(ensureAuthenticated);


usersRouter.get('/', async (req, res) => {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findAllUsers();

    return res.json({ user: classToClass(user) });
  }
);

usersRouter.get(
  '/:id',
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
      mobile: Joi.number().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersController.create
);

export default usersRouter;
