import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { mobile, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      mobile,
      password,
    });

    return res.json({user: classToClass(user), token });
  }
}
