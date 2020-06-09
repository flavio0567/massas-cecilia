import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService.ts';
import UpdateProductAvatarService from '@modules/products/services/UpdateProductAvatarService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { code, name, barcode, unit, sales_price, ncm, is_active } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      code,
      name,
      barcode,
      unit,
      sales_price,
      ncm,
      is_active
    });

    return res.json(product);
  }

  public async patch(req: Request, res: Response): Promise<Response> {}
}
