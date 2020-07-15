import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      code,
      name,
      barcode,
      unit,
      sales_price,
      ncm,
      amount,
      is_inactive,
      product_family,
      category,
      sub_category
    } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      code,
      name,
      barcode,
      unit,
      sales_price,
      ncm,
      amount,
      is_inactive,
      product_family,
      category,
      sub_category
    });

    return res.json({ product: classToClass(product) });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name,
      unit,
      sales_price,
      amount,
      is_inactive,
      product_family,
      category,
      sub_category
    } = req.body;
    console.log(req.body);
    const { product_id } = req.params;

    const id = product_id;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      unit,
      sales_price,
      amount,
      is_inactive,
      product_family,
      category,
      sub_category
    });

    return res.json({ product: classToClass(product) });
  }
}
