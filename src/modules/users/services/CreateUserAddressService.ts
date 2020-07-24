import { injectable, inject } from 'tsyringe';

import IUsersAddressRepository from '../repositories/IUsersAddressRepository';

import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  user_id: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersAddressRepository')
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  public async execute({
    user_id,
    address1,
    address2,
    city,
    state,
    zip_code
  }: IRequest): Promise<Address> {
    const userAddress = await this.usersAddressRepository.create({
      user_id,
      address1,
      address2,
      city,
      state,
      zip_code
    });

    return userAddress;
  }
}

export default CreateUserService;
