import { getRepository, Repository } from 'typeorm';
import cep from 'cep-promise';

import IUsersAddressRepository from '@modules/users/repositories/IUsersAddressRepository';
import ICreateUserAddressDTO from '@modules/users/dtos/ICreateUserAddressDTO';

import Address from '../entities/Address';

interface CEP {
  cep: string | number;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

class UsersAddressRepository implements IUsersAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findByCep(userCep: string | number): Promise<CEP | null | void> {
    let findAddress: CEP | null | void;

    findAddress = await cep(userCep).then(response => {
      console.log(response);
    });

    return findAddress;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = await this.ormRepository.findOne(id);

    return findAddress;
  }

  public async create({
    user_id,
    address1,
    address2,
    city,
    state,
    zip_code
  }: ICreateUserAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      user_id,
      address1,
      address2,
      city,
      state,
      zip_code
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default UsersAddressRepository;
