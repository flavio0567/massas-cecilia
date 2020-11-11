import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { mobile } = req.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    );

    await sendForgotPasswordEmail.execute({
      mobile
    });

    return res.status(204).json();
  }
}
