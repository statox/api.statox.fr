import express from 'express';
import cors from 'cors';
import { Validator } from 'express-json-validator-middleware';
import { routes } from './src/routes';
import { checkRequiredPermissions, validateAccessToken } from './src/middleware/auth0.middleware';
import { errorHandler } from './src/middleware/errors.middleware';
import mustacheExpress from 'mustache-express';

const PORT = process.env.PORT || 3000;

const { validate } = new Validator({});
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

for (const route of routes) {
    if (route.method === 'get') {
        app.get(route.path, route.handler);
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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
