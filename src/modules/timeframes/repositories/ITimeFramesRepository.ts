import ICreateTimeFrameDTO from '../dtos/ICreateTimeFrameDTO';
import IUpdateTimeFrameDTO from '../dtos/IUpdateTimeFrameDTO';
import TimeFrame from '../infra/typeorm/schemas/TimeFrame';

export default interface ITimeFrameRepository {
  findById(id: string): Promise<TimeFrame | undefined>;
  create(data: ICreateTimeFrameDTO): Promise<TimeFrame>;
  update(data: IUpdateTimeFrameDTO): Promise<TimeFrame>;
  save(data: TimeFrame): Promise<TimeFrame>;
}
