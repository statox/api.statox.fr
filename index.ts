import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';
import { checkRequiredPermissions, validateAccessToken } from './src/middleware/auth0.middleware';
import { errorHandler } from './src/middleware/errors.middleware';

const PORT = process.env.PORT || 3000;

const app = express();

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
        app.post(route.path, route.handler);
    }
}

app.get('/protected', validateAccessToken, checkRequiredPermissions(['author']), (req, res) => {
    const message = {
        status: 'ok'
    };

    res.status(200).json(message);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
