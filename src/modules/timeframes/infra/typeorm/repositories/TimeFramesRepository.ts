import { getMongoRepository, MongoRepository } from 'typeorm';

import ITimeFramesRepository from '@modules/timeframes/repositories/ITimeFramesRepository';
import ICreateTimeFrameDTO from '@modules/timeframes/dtos/ICreateTimeFrameDTO';
import IUpdateTimeFrameDTO from '@modules/timeframes/dtos/IUpdateTimeFrameDTO';

import TimeFrame from '../schemas/TimeFrame';
import { add, format, formatISO } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';

class TimeFramesRepository implements ITimeFramesRepository {
  private ormRepository: MongoRepository<TimeFrame>;

  constructor() {
    this.ormRepository = getMongoRepository(TimeFrame, 'mongo');
  }

  public async findTimeFrames(): Promise<TimeFrame[]> {
    const findTimeFrame = await this.ormRepository.find(
      {
        order: {
          created_at: 'ASC'
        }
      }
    );

    return findTimeFrame;
  }

  public async findTimeFrameRange(weekday: string, date: string): Promise<TimeFrame[]> {
    const findTimeFrame = await this.ormRepository.find(
      {
        order: {
          created_at: 'ASC'
        },
        where: {
          weekday
        }
      }
    );

    const dateLocale = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { locale: brLocale });

    const checkDate = new Date(date).setHours(0, 0, 0, 0);

    const today = new Date().setHours(0, 0, 0, 0);

    const { start, end } = findTimeFrame[0];

    const startHour = Number(start.slice(0, 2));

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => format(new Date().setHours(startHour + index), 'HH:00'),
    );

    let halfHourArray = Array.from(
      { length: 10 },
      (_, index) => startHour + index + ':30',
    );

    const paddedHour = halfHourArray
      .filter((time) => time.length < 5)
      .map((time) => {
        return time.padStart(5, '0');
      }
    );

    halfHourArray = halfHourArray.filter((time) => time.length > 4)

    const timeFrameRange = (eachHourArray.concat(halfHourArray, paddedHour)).sort() as [];

    let resultTimeFrame;

    const checkHour = (formatISO(add(new Date(dateLocale), { minutes: 50 }), { representation: "time" })).slice(0, 5);

    if (today === checkDate) {
      resultTimeFrame = timeFrameRange
        .filter((time) => time >= start && time <= end)
        .map((time: string) => {
          let available = true;
          if (time < checkHour) { available = false };
          return { 'hour': time, 'available': available };
        });
    } else {
      resultTimeFrame = timeFrameRange
        .filter((time) => time >= start && time <= end)
        .map((time: string) => {
          let available = true;
          return { 'hour': time, 'available': available };
        });
    };

    return resultTimeFrame as [];
  }

  public async findById(id: string): Promise<TimeFrame | undefined> {
    const findTimeFrame = await this.ormRepository.findOne(id);

    return findTimeFrame;
  }

  public async create({
    start,
    end,
    weekday,
    available
  }: ICreateTimeFrameDTO): Promise<TimeFrame> {
    const timeframe = this.ormRepository.create({
      start,
      end,
      weekday,
      available
    });

    await this.ormRepository.save(timeframe);

    return timeframe;
  }

  public async update(timeframe: IUpdateTimeFrameDTO): Promise<any> {
    await this.ormRepository.save(timeframe);

    return;
  }

  public async save(timeframe: TimeFrame): Promise<TimeFrame> {
    return this.ormRepository.save(timeframe);
  }
}

export default TimeFramesRepository;
