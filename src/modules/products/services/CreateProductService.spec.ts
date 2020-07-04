import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

let fakeUsersRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(fakeUsersRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      code: '1',
      name: 'MASSA CONCHIGLIONE',
      barcode: 1,
      unit: 'KG',
      sales_price: 16.9,
      ncm: 19022000,
      is_inactive: 0
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a duplicated peoduct code', async () => {
    await createProduct.execute({
      code: '1',
      name: 'MASSA CONCHIGLIONE',
      barcode: 1,
      unit: 'KG',
      sales_price: 16.9,
      ncm: 19022000,
      is_inactive: 0
    });

    await expect(
      createProduct.execute({
        code: '1',
        name: 'MASSA CONCHIGLIONE',
        barcode: 1,
        unit: 'KG',
        sales_price: 16.9,
        ncm: 19022000,
        is_inactive: 0
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
