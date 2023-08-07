import { WebApplicationBuilder } from './src/core/builder/web-application';
import { HealthController } from './src/controllers/health-controller';

const builder = WebApplicationBuilder.createBuilder();
builder.addControllers([new HealthController()]);

const app = builder.build();
app.mapControllers();
app.run();
