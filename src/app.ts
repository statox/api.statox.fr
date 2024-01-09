import express from 'express';
import cors from 'cors';
import { Validator } from 'express-json-validator-middleware';
import { routes } from './routes';
import { checkRequiredPermissions, validateAccessToken } from './middleware/auth0.middleware';
import { errorHandler } from './middleware/errors.middleware';
import mustacheExpress from 'mustache-express';
import { multipartHandler } from './middleware/multipart.middleware';
import { goatCounterHandler } from './middleware/goatcounter.middleware';

const { validate } = new Validator({ allowUnionTypes: true });
export const app = express();

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

app.use(goatCounterHandler);
app.use(multipartHandler);

for (const route of routes) {
    if (route.method === 'get') {
        if (route.protected) {
            app.get(
                route.path,
                validateAccessToken,
                checkRequiredPermissions(['author']),
                route.handler
            );
        } else {
            app.get(route.path, route.handler);
        }
    }

    if (route.method === 'post') {
        if (route.protected) {
            app.post(
                route.path,
                validateAccessToken,
                checkRequiredPermissions(['author']),
                validate({ body: route.inputSchema }),
                route.handler
            );
        } else {
            app.post(route.path, validate({ body: route.inputSchema }), route.handler);
        }
    }
}

app.use(errorHandler);
