import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        // TODO have a proper local setup to avoid localhost in prod
        origin: ['https://apps.statox.fr', 'http://localhost:8080']
    })
);

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

for (const route of routes) {
    if (!route.method || route.method === 'get') {
        app.get(route.path, route.handler);
    } else if (route.method === 'post') {
        app.post(route.path, route.handler);
    }
}
