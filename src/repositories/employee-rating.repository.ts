import { ModelType, ObjectType } from "dynamoose/dist/General";
import { ScanResponse } from "dynamoose/dist/ItemRetriever";

import { EmployeeRating } from '../models/employee-rating.entity';

export interface IEmployeeRatingRepository {
  save(item: Partial<EmployeeRating>): Promise<EmployeeRating | ObjectType>;
  getAll(limit: number, lastKey?: ObjectType): Promise<ScanResponse<EmployeeRating> | ObjectType>;
  getById(id: string): Promise<EmployeeRating | ObjectType | null>;
  delete(id: string): Promise<void>;
}

export class EmployeeRatingRepository {
  private readonly employeeRatingModel: ModelType<EmployeeRating>;

  constructor(employeeRatingModel: ModelType<EmployeeRating>) {
    this.employeeRatingModel = employeeRatingModel;
  }

  async save(item: Partial<EmployeeRating>): Promise<EmployeeRating | ObjectType> {
    return this.employeeRatingModel.create(item);
  }

  async getAll(limit: number, lastKey?: ObjectType): Promise<ScanResponse<EmployeeRating> | ObjectType> {
    if (!lastKey) {
      return this.employeeRatingModel.scan().limit(limit).exec();
    }

    return this.employeeRatingModel.scan().startAt(lastKey).limit(limit).exec();
  }

  async getById(id: string): Promise<EmployeeRating | ObjectType | null> {
    return this.employeeRatingModel.get(id);
  }

  async delete(id: string): Promise<void> {
    await this.employeeRatingModel.delete(id);
  }
}
