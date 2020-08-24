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
      sales_price: 16.9,
      unit: 'KG',
      amount: 10,
      barcode: 1,
      ncm: 19022000,
      is_inactive: 0,
      product_family: 1,
      category: 1,
      sub_category: 1
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a duplicated peoduct code', async () => {
    await createProduct.execute({
      code: '1',
      name: 'MASSA CONCHIGLIONE',
      sales_price: 16.9,
      unit: 'KG',
      amount: 10,
      barcode: 1,
      ncm: 19022000,
      is_inactive: 0,
      product_family: 1,
      category: 1,
      sub_category: 1
    });

    await expect(
      createProduct.execute({
        code: '1',
        name: 'MASSA CONCHIGLIONE',
        sales_price: 16.9,
        unit: 'KG',
        amount: 10,
        barcode: 1,
        ncm: 19022000,
        is_inactive: 0,
        product_family: 1,
        category: 1,
        sub_category: 1
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
