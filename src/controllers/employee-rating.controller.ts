import { IControllerBase } from '../core/controllers/controller-base';
import { IEmployeeRatingRepository } from '../repositories/employee-rating.repository';
import { EmployeeRating } from '../models/employee-rating.entity';
import { PaginationResponse } from '../types/pagination-response.type';

export class EmployeeRatingController implements IControllerBase {
  readonly baseUrl = 'v1/employee-rating';
  readonly handlers: Map<string, Map<string, Function[]>>;
  private readonly _employeeRatingRepository: IEmployeeRatingRepository;

  constructor(employeeRatingRepository: IEmployeeRatingRepository) {
    this._employeeRatingRepository = employeeRatingRepository;

    const rootPath = new Map<string, Function[]>();
    rootPath.set('post', [this.create]);
    rootPath.set('get', [this.getAll]);

    const idPath = new Map<string, Function[]>();
    idPath.set('delete', [this.deleteById]);
    idPath.set('get', [this.getById])

    this.handlers = new Map<string, Map<string, Function[]>>();
    this.handlers.set('', rootPath);
    this.handlers.set('/:id', idPath);
  }

  create = async (req: any, res: any): Promise<EmployeeRating> => {
    const { body: { employeeId, rating } } = req;
    const result = await this._employeeRatingRepository.save({
      employeeId,
      rating,
    });
    return res.status(201).send(result);
  }

  getAll = async (req: any, res: any): Promise<PaginationResponse<EmployeeRating[]>> => {
    const { query: { limit, lastKey } } = req;
    const startAt = !lastKey ? lastKey : { id: lastKey };
    const result = await this._employeeRatingRepository.getAll(parseInt(limit), startAt);

    return res.status(200).send({
      data: result,
      lastKey: result.lastKey ?? null,
    });
  }

  getById = async (req: any, res: any): Promise<EmployeeRating> => {
    const { params: { id } } = req;
    const result = await this._employeeRatingRepository.getById(id);

    if (!result) {
      return res.status(404).send();
    }

    return res.status(200).send(result);
  }

  deleteById = async (req: any, res: any): Promise<void> => {
    const { params: { id } } = req;
    await this._employeeRatingRepository.delete(id);
    return res.status(204).send();
  }
}
