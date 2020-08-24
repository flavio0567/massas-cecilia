import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      password_confirmation: Joi.string()
        .required()
        .valid(Joi.ref('password')),
      is_admin: Joi.number().default(0),
      is_active: Joi.number().default(0)
    }
  }),
  profileController.update
);

export default profileRouter;
