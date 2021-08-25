import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ITimeFramesRepository from '../repositories/ITimeFramesRepository';

import TimeFrame from '../infra/typeorm/schemas/TimeFrame';

interface IRequest {
  id: string;
  start: string;
  end: string;
  available: boolean;
}

@injectable()
class UpdateTimeFrameService {
  constructor(
    @inject('TimeFramesRepository')
    private timeframesRepository: ITimeFramesRepository
  ) {}

  public async execute({ id, start, end, available }: IRequest): Promise<TimeFrame> {
    const timeframe = await this.timeframesRepository.findById(id);

    if (!timeframe) {
      throw new AppError('Timeframe not found.');
    }

    timeframe.start = start;
    timeframe.end = end;
    timeframe.available = available;

    return this.timeframesRepository.save(timeframe);
  }
}

export default UpdateTimeFrameService;
