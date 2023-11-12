import * as dynamoose from 'dynamoose';

import { EmployeeRatingRepository } from './employee-rating.repository';
import { EmployeeRatingModel } from '../models/employee-rating.entity';
import { app } from '../config/app.config';

describe('EmployeeRatingRepository', () => {
  let employeeRatingRepository;

  beforeAll(() => {
    if (app.environment == 'test') {
      const ddb = new dynamoose.aws.ddb.DynamoDB({
        credentials: {
          accessKeyId: 'na',
          secretAccessKey: 'na',
        },
        region: app.database.dynamodb.region,
        endpoint: app.database.dynamodb.host,
      });
  
      dynamoose.aws.ddb.set(ddb);
    }

    if (app.environment == 'dev') {
      dynamoose.aws.ddb.local();
    }
  });

  beforeEach(() => {
    employeeRatingRepository = new EmployeeRatingRepository(EmployeeRatingModel);
  })

  test('Should apply the CRUD operations', async () => {
    await employeeRatingRepository.save({
      employeeId: '654f15a4b650ce6a4eda732d',
      rating: 0,
    });
    const docs = await employeeRatingRepository.getAll(5);
    expect(docs[0].employeeId).toEqual('654f15a4b650ce6a4eda732d');

    const doc = await employeeRatingRepository.getById(docs[0].id);
    expect(doc).not.toBeNull();

    await employeeRatingRepository.delete(docs[0].id);

    const docsAfterDeletion = await employeeRatingRepository.getAll(5);
    expect(docsAfterDeletion).toHaveLength(0);
  });
});
