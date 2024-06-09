import express from 'express';
import cors from 'cors';
import { Validator } from 'express-json-validator-middleware';
import { routes } from './routes';
import { checkRequiredPermissions, validateAccessToken } from './middleware/auth0.middleware';
import { errorHandler } from './middleware/errors.middleware';
import mustacheExpress from 'mustache-express';
import { multipartHandler } from './middleware/multipart.middleware';
import { goatCounterHandler } from './middleware/goatcounter.middleware';
import { loggingHandler } from './middleware/logging.middleware';
import { startPeriodicTasks } from './PeriodicTasks';
import { slog } from './services/logging';
import { isTests } from './services/env-helpers/env';

const { validate } = new Validator({ allowUnionTypes: true });
export let app: express.Express;

const PORT = process.env.PORT || 3000;

export const initApp = () => {
    slog.log('app', 'init app');
    app = express();
    app.use(
        cors({
            // TODO have a proper local setup to avoid localhost in prod
            origin: ['https://apps.statox.fr', 'http://localhost:8080']
        })
    );

    app.use(express.json());

    app.set('views', './src/views');
    app.set('view engine', 'mustache');
    app.engine('mustache', mustacheExpress());

    app.use(loggingHandler);
    app.use(goatCounterHandler);
    app.use(multipartHandler);

    for (const route of routes) {
        const pipeline = [];

        if (route.authentication === 'user') {
            pipeline.push(validateAccessToken);
            pipeline.push(checkRequiredPermissions(['author']));
        }
        if (route.method === 'post') {
            pipeline.push(validate({ body: route.inputSchema }));
        }
        pipeline.push(route.handler);

        if (route.method === 'get') {
            app.get(route.path, pipeline);
        } else if (route.method === 'post') {
            app.post(route.path, pipeline);
        }
    }

    app.use(errorHandler);
    app.listen(PORT, () => slog.log('app', 'App listening', { port: Number(PORT) }));

    if (!isTests) {
        startPeriodicTasks();
    }
};
