import { IControllerBase } from '../controllers/controller-base';
import { RouteConfiguration } from '../types/route-configuration';
import { apiConfig } from '../../config/api';

const express = require('express');

interface IWebApplication {
  run(): void;
  mapControllers(): void;
}

class WebApplication implements IWebApplication {
  private _app: any;
  private _routeConfigurations: RouteConfiguration[];

  set routeConfigurations(value: RouteConfiguration[]) {
    this._routeConfigurations = value;
  }

  set app(expressApplication: any) {
    this._app = expressApplication;
  }

  mapControllers(): void {
    this._app.use(express.json());

    for (const configuration of this._routeConfigurations) {
      const baseUrl = `${apiConfig.basePath}/${configuration.controllerName}`
      const router = express.Router();

      configuration.routeMapping.forEach((value, key) => {
        value.forEach((innerValue, innerKey) => {
          if (innerKey === 'get') {
            router.route(key).get(...innerValue);
          }

          if (innerKey === 'post') {
            router.route(key).post(...innerValue);
          }

          if (innerKey === 'patch') {
            router.route(key).patch(...innerValue);
          }

          if (innerKey === 'put') {
            router.route(key).put(...innerValue);
          }

          if (innerKey === 'delete') {
            router.route(key).delete(...innerValue);
          }
        });
      });

      this._app.use(baseUrl, router);
    }
  }

  run(): void {
    const port = process.env.APP_PORT || 3000;
    this._app.listen(port, () => console.info(`Web application running on port ${port}`));
  }
}

export class WebApplicationBuilder {
  private constructor() {}

  private routeConfigurations: RouteConfiguration[] = [];

  static createBuilder(): WebApplicationBuilder {
    return new WebApplicationBuilder();
  }

  addControllers(controllers: IControllerBase[]): void {
    for (const controller of controllers) {
      const routeConfiguration = {} as RouteConfiguration;
      routeConfiguration.controllerName = controller.baseUrl;
      routeConfiguration.routeMapping = controller.handlers;

      this.routeConfigurations.push(routeConfiguration);
    }
  }

  build(): IWebApplication {
    const webApplication = new WebApplication();
    webApplication.app = express();
    webApplication.routeConfigurations = this.routeConfigurations;

    return webApplication;
  }
}
