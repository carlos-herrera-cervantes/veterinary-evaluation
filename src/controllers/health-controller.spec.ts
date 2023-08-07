import { HealthController } from './health-controller';

describe('HealthController', function() {
  const healthController = new HealthController();

  test('healthCheck', function() {
    const mockRes = {
      status: function(statusCode: number) {
        const innerMock = {
          send: function(actionResult: any) {
            return actionResult;
          },
        };
        return innerMock;
      }
    };

    const httpResponse = healthController.healthCheck({}, mockRes);
    expect(httpResponse).not.toBeUndefined();
    expect(httpResponse.message).toEqual('OK');
  });
});
