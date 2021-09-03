import { Router } from 'express';
import { classToClass } from 'class-transformer';

import TimeFrameRepository from '@modules/timeframes/infra/typeorm/repositories/TimeFramesRepository';

import TimeFramesController from '../controllers/TimeFramesController';
import TimeFramesRepository from '@modules/timeframes/infra/typeorm/repositories/TimeFramesRepository';

const timeframesRouter = Router();

const timeframesController = new TimeFramesController();

timeframesRouter.get('/', async (req, res) => {
  const timeframesRepository = new TimeFrameRepository();

  const timeframe = await timeframesRepository.findTimeFrames();

  return res.json(timeframe);
});

timeframesRouter.get(
  '/:weekday/:date', async (req, res) => {
    const { weekday, date } = req.params;
    const { offset } = req.query;

    const timeframesRepository = new TimeFrameRepository();
    const timeframe = await timeframesRepository.findTimeFrameRange(weekday, date, Number(offset));

    return res.json({ timeframe: classToClass(timeframe) });
});

timeframesRouter.post(
  '/',

  async (req, res) => {
    const { start, end, weekday, available } = req.body;

    const timeframesRepository = new TimeFramesRepository();
    const timeframe = await timeframesRepository.create({ start, end, weekday, available });

    return res.json(timeframe);
  }
);

timeframesRouter.patch(
  '/:timeframe_id',
  timeframesController.update
);

export default timeframesRouter;
