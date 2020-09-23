import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      avatar,
      name,
      email,
      mobile,
      password,
      is_admin,
      is_active
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      avatar,
      name,
      email,
      mobile,
      password,
      is_admin,
      is_active
    });

    return res.json({ user: classToClass(user) });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, mobile, password, is_admin, is_active } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      name,
      email,
      mobile,
      password,
      is_admin,
      is_active
    });

    return res.json({ user: classToClass(user) });
  }
}
