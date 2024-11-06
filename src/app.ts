import cors from 'cors';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { Socket } from 'net';
import { Server } from 'http';
import { Validator } from 'express-json-validator-middleware';
import { checkRequiredPermissions, validateAccessToken } from './libs/middleware/auth0.middleware';
import { errorHandler } from './libs/middleware/errors.middleware';
// import { goatCounterHandler } from './libs/middleware/goatcounter.middleware';
import { isProd } from './libs/config/env';
import { loggingHandler } from './libs/middleware/logging.middleware';
import { multipartHandler } from './libs/middleware/multipart.middleware';
import { routes } from './libs/routes';
import { slog } from './libs/modules/logging';
import { startPeriodicTasks } from './libs/PeriodicTasks';
import { validateAPIKeyHeader } from './libs/middleware/authIOT.middleware';

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

    // Default is 100kb, bumped the limit for chords/updateAll
    // TODO Maybe rework the endpoint to not get the whole file and decrease the limit again
    app.use(express.json({ limit: '500kb' }));

    app.set('views', './src/views');
    app.set('view engine', 'mustache');
    app.engine('mustache', mustacheExpress());

    app.use(loggingHandler);
    // app.use(goatCounterHandler);
    app.use(multipartHandler);

    for (const route of routes) {
        const pipeline = [];

        if (route.authentication === 'user') {
            pipeline.push(validateAccessToken);
            pipeline.push(checkRequiredPermissions(['author']));
        } else if (route.authentication === 'apikey-iot') {
            pipeline.push(validateAPIKeyHeader);
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
    const server = app.listen(PORT, () => slog.log('app', 'App listening', { port: Number(PORT) }));
    configureServerTimeout(server);

    if (isProd) {
        startPeriodicTasks();
    }
};

const configureServerTimeout = (server: Server) => {
    // https://betterstack.com/community/guides/scaling-nodejs/nodejs-timeouts/
    // requestTimeout: limit for how long the server should wait to receive the entire request (including the body) from the client
    server.requestTimeout = 5000; // (default 300000)

    // headersTimeout: time allowed for receiving request headers from the client.
    server.headersTimeout = 2000; // (default 60000)

    // keepAliveTimeout: how long a server holds a connection open after responding to a request.
    // It's key for HTTP Keep-Alive, which allows multiple requests over a single connection, boosting efficiency.
    // It defaults to 5 seconds and if no additional request arrives within that time, the socket connection closes.
    // server.keepAliveTimeout = 3000; (default 5000)

    // timeout: limit the inactivity period (no data sent or received) on an established socket connection
    server.timeout = 10000; // (default 0 - no limit)

    server.on('timeout', (socket: Socket) => {
        slog.log('app', 'A request timedout');
        socket.destroy();
    });
};
