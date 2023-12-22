import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';
import { checkRequiredPermissions, validateAccessToken } from './src/middleware/auth0.middleware';
import { errorHandler } from './src/middleware/errors.middleware';

const PORT = process.env.PORT || 3000;

export const app = express();

app.use(
    cors({
        // TODO have a proper local setup to avoid localhost in prod
        origin: ['https://apps.statox.fr', 'http://localhost:8080']
    })
);

app.use(express.json());

for (const route of routes) {
    if (!route.method || route.method === 'get') {
        app.get(route.path, route.handler);
    } else if (route.method === 'post') {
        if (route.protected) {
            app.post(
                route.path,
                validateAccessToken,
                checkRequiredPermissions(['author']),
                route.handler
            );
        } else {
            app.post(route.path, route.handler);
        }
    }
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
