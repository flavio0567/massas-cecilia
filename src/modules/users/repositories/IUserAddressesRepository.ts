import Address from '../infra/typeorm/entities/Address';

import ICreateUserAddressDTO from '../dtos/ICreateUserAddressDTO';

export default interface IUserAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  create(data: ICreateUserAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
