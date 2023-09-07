import { IControllerBase } from '../core/controllers/controller-base';
import { HealthCheckResponse } from '../types/health-check-response';

export class HealthController implements IControllerBase {
  readonly baseUrl = 'v1/health';
  readonly handlers: Map<string, Map<string, Function[]>>;

  constructor() {
    const healthCheckRoutes = new Map<string, Function[]>();
    healthCheckRoutes.set('get', [this.healthCheck]);

    this.handlers = new Map<string, Map<string, Function[]>>();
    this.handlers.set('/check', healthCheckRoutes);
  }

  healthCheck(_: any, res: any): HealthCheckResponse {
    return res.status(200).send({
      message: 'OK',
      timestamp: new Date(),
    });
  }
}
