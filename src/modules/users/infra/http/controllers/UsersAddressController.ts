import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserAddressService from '@modules/users/services/CreateUserAddressService';

export default class UsersAddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, address1, address2, city, state, zip_code } = req.body;

    const createUserAddress = container.resolve(CreateUserAddressService);

    const userAddress = await createUserAddress.execute({
      user_id,
      address1,
      address2,
      city,
      state,
      zip_code
    });

    return res.json(userAddress);
  }
}
