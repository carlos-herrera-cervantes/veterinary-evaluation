import { EmployeeRatingController } from './employee-rating.controller';
import { EmployeeRatingRepository } from '../repositories/employee-rating.repository';
import { EmployeeRatingModel } from '../models/employee-rating.entity';

describe('EmployeeRatingController', () => {
  let employeeRatingRepository;

  beforeEach(() => {
    employeeRatingRepository = new EmployeeRatingRepository(EmployeeRatingModel);
  });

  it('EmployeeRatingController - Should be defined', () => {
    expect(employeeRatingRepository).toBeDefined();
  });

  it('create - Happy path', async () => {
    const employeeRatingRepositoryCreate = jest
      .spyOn(EmployeeRatingRepository.prototype, 'save')
      .mockImplementation(() => Promise.resolve({}));
    const employeeRatingController = new EmployeeRatingController(employeeRatingRepository);
    const mockRes = {
      status: function (statusCode: number) {
        return this;
      },
      send: function (payload: any) {
        return payload;
      }
    };
    const mockReq = {
      body: { employeeId: '654fec873473b79bd6cac615', rating: 0 },
    };

    const result = await employeeRatingController.create(mockReq, mockRes);

    expect(employeeRatingRepositoryCreate).toHaveBeenCalled();
    expect(result).not.toBeNull();
  });

  it('getAll - Happy path', async () => {
    const employeeRatingRepositoryGetAll = jest
      .spyOn(EmployeeRatingRepository.prototype, 'getAll')
      .mockImplementation(() => Promise.resolve([]));
    const employeeRatingController = new EmployeeRatingController(employeeRatingRepository);
    const mockRes = {
      status: function (statusCode: number) {
        return this;
      },
      send: function (payload: any) {
        return payload;
      }
    };
    const mockReq = {
      query: { limit: '5' },
    };

    const result = await employeeRatingController.getAll(mockReq, mockRes);

    expect(employeeRatingRepositoryGetAll).toBeCalled();
    expect(result.lastKey).toBeNull();
    expect(result.data).toHaveLength(0);
  });

  it('getById - Happy path', async () => {
    const employeeRatingRepositoryGetById = jest
      .spyOn(EmployeeRatingRepository.prototype, 'getById')
      .mockImplementation(() => Promise.resolve({}));
    const employeeRatingController = new EmployeeRatingController(employeeRatingRepository);
    const mockRes = {
      status: function (statusCode: number) {
        return this;
      },
      send: function (payload: any) {
        return payload;
      }
    };
    const mockReq = {
      params: { id: '646c8a46-3267-459b-8d4c-d82a6dd10207' },
    };

    const result = await employeeRatingController.getById(mockReq, mockRes);

    expect(employeeRatingRepositoryGetById).toBeCalled();
    expect(result).toBeTruthy();
  });

  it('getById - Should return not found', async () => {
    const employeeRatingRepositoryGetById = jest
      .spyOn(EmployeeRatingRepository.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(null));
    const employeeRatingController = new EmployeeRatingController(employeeRatingRepository);
    const mockRes = {
      status: function (statusCode: number) {
        return this;
      },
      send: function (payload: any) {
        return payload;
      }
    };
    const mockReq = {
      params: { id: '646c8a46-3267-459b-8d4c-d82a6dd10207' },
    };

    const result = await employeeRatingController.getById(mockReq, mockRes);

    expect(employeeRatingRepositoryGetById).toBeCalled();
    expect(result).toBeFalsy();
  });

  it('deleteById - Happy path', async () => {
    const employeeRatingRepositoryDelete = jest
      .spyOn(EmployeeRatingRepository.prototype, 'delete')
      .mockImplementation(() => Promise.resolve());
    const employeeRatingController = new EmployeeRatingController(employeeRatingRepository);
    const mockRes = {
      status: function (statusCode: number) {
        return this;
      },
      send: function (payload: any) {
        return payload;
      }
    };
    const mockReq = {
      params: { id: '646c8a46-3267-459b-8d4c-d82a6dd10207' },
    };

    const result = await employeeRatingController.deleteById(mockReq, mockRes);

    expect(employeeRatingRepositoryDelete).toBeCalled();
    expect(result).toBeFalsy();
  });
});
