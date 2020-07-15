import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ActivateProductService from '@modules/products/services/ActivateProductService';

export default class ActivateProductsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;

    const id = product_id;

    const activateProduct = container.resolve(ActivateProductService);

    const product = await activateProduct.execute({ id });

    return res.json({ product: classToClass(product) });
  }
}
