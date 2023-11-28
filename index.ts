import express from "express";
import { routes } from './src/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

for (const route of routes) {
    app.get(route.path, route.handler);
}
