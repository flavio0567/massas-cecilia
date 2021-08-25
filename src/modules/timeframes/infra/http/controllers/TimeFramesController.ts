import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TimeFrameService from '@modules/timeframes/services/TimeFrameService';

export default class TimeFramesController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { timeframe_id } = req.params;
    const { start, end, available } = req.body;

    const updateTimeFrame = container.resolve(TimeFrameService);

    const timeframe = await updateTimeFrame.execute({
      id: timeframe_id,
      start,
      end,
      available
    });

    return res.json(timeframe);
  }
}
