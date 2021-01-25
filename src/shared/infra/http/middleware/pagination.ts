import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

export default async function Pagination(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Product[]> {
    try {
      const productsRepository = new ProductsRepository();

      const page: number = Number(req.query.page);

      const limit: number = Number(req.query.limit);

      let startIndex = (page - 1) * limit;

      if (Number.isNaN(startIndex)) {
        startIndex = 0;
      }

      const endIndex = page * limit;

      const product = await productsRepository.findProducts(limit, endIndex);

      let resultProducts = {};

      resultProducts.next = {
        page: page + 1,
        limit: limit,
      }

      resultProducts.previous = {
        page: page - 1,
        limit: limit,
      }

      res.paginatedResults = product;

      return next();
    } catch {
      throw new AppError('Produto não encontrado.', 404);
    }
};
