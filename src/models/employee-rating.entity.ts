import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { v4 } from 'uuid';

class EmployeeRating extends Item {
  id: string;
  employeeId: string;
  rating: number;
}

const EmployeeRatingModel = dynamoose.model<EmployeeRating>("EmployeeRating", new dynamoose.Schema({
  id: { type: String, hashKey: true, default: v4 },
  employeeId: { type: String },
  rating: { type: Number },
}, {
  "timestamps": true,
}));

export { EmployeeRatingModel, EmployeeRating };
