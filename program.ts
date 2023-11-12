import { WebApplicationBuilder } from './src/core/builder/web-application';
import { HealthController } from './src/controllers/health-controller';
import { EmployeeRatingController } from './src/controllers/employee-rating.controller';
import { EmployeeRatingRepository } from './src/repositories/employee-rating.repository';
import { EmployeeRatingModel } from './src/models/employee-rating.entity';

const builder = WebApplicationBuilder.createBuilder();
builder.addControllers([
  new HealthController(),
  new EmployeeRatingController(new EmployeeRatingRepository(EmployeeRatingModel)),
]);

const app = builder.build();
app.mapControllers();
app.addPoorsManDbContext();
app.run();
