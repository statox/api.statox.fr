import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        // TODO have a proper local setup to avoid localhost in prod
        origin: ['https://statox.github.io', 'http://localhost:8080']
    })
);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

for (const route of routes) {
    app.get(route.path, route.handler);
}
