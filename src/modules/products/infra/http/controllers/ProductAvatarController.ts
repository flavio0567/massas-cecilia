import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductAvatarService from '@modules/products/services/UpdateProductAvatarService';

export default class ProductAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;
        const updateProductAvatar = container.resolve(UpdateProductAvatarService);

        const product = await updateProductAvatar.execute({
          product_id,
          avatarFilename: req.file.filename
        });

        return res.json({ product: classToClass(product) });
    }
}
