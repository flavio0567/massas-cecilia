import { getRepository, Repository } from 'typeorm';

import IUserAddressesRepository from '@modules/users/repositories/IUserAddressesRepository';
import ICreateUserAddressDTO from '@modules/users/dtos/ICreateUserAddressDTO';

import Address from '../entities/Address';

class UserAddressesRepository implements IUserAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = await this.ormRepository.findOne(id);

    return findAddress;
  }

  public async create({
    user_id,
    street_1,
    street_2,
    city,
    state,
    zip_code,
  }: ICreateUserAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      user_id,
      street_1,
      street_2,
      city,
      state,
      zip_code,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default UserAddressesRepository;
