import Address from '../infra/typeorm/entities/Address';

import ICreateUserAddressDTO from '../dtos/ICreateUserAddressDTO';

interface CEP {
  cep: string | number;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

export default interface IUserAddressesRepository {
  findByCep(userCep: string | number): Promise<CEP | null | void>;
  findById(id: string): Promise<Address | undefined>;
  create(data: ICreateUserAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
