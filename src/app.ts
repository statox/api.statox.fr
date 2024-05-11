import express from 'express';
import cors from 'cors';
import { Validator } from 'express-json-validator-middleware';
import { routes } from './routes/index.js';
import { checkRequiredPermissions, validateAccessToken } from './middleware/auth0.middleware.js';
import { errorHandler } from './middleware/errors.middleware.js';
import mustacheExpress from 'mustache-express';
import { multipartHandler } from './middleware/multipart.middleware.js';
import { goatCounterHandler } from './middleware/goatcounter.middleware.js';
import { loggingHandler } from './middleware/logging.middleware.js';
import { startPeriodicTasks } from './PeriodicTasks/index.js';
import { slog } from './services/logging/index.js';

const { validate } = new Validator({ allowUnionTypes: true });
export let app: express.Express;

const PORT = process.env.PORT || 3000;

export const initApp = () => {
    slog.log({ message: 'init app', logToSlack: true });
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

        if (route.protected) {
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
    app.listen(PORT, () =>
        slog.log({ message: 'App listening', port: Number(PORT), logToSlack: true })
    );

    startPeriodicTasks();
};
