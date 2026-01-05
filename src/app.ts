import cors from 'cors';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { DateTime } from 'luxon';
import { Server } from 'http';
import { AllowedSchema, Validator } from 'express-json-validator-middleware';
import { errorHandler } from './libs/middleware/errors.middleware.js';
// import { goatCounterHandler } from './libs/middleware/goatcounter.middleware';
import { config } from './packages/config/index.js';
import { loggingHandler } from './libs/middleware/logging.middleware.js';
import { multipartHandler } from './libs/middleware/multipart.middleware.js';
import { routes } from './libs/routes/index.js';
import { slog } from './libs/modules/logging/index.js';
import { startPeriodicTasks } from './libs/PeriodicTasks/index.js';
import { validateAPIKeyHeader } from './libs/middleware/authIOT.middleware.js';
import { apiPipeline } from './libs/middleware/apiPipeline.middleware.js';
import { WebSocketServer } from 'ws';
import { initWsServer } from './app-ws.js';
import {
    doPassportSession,
    logoutPassportRequest,
    setPassportHeaders,
    validateEndpointScope,
    validatePassportAuth,
    validatePassportSession
} from './libs/middleware/auth_passport.middleware.js';
import { initOpenapi } from './libs/modules/openapi/index.js';

const { validate } = new Validator({ allowUnionTypes: true });
export let app: express.Express;
export let wss: WebSocketServer;

const PORT = process.env.PORT || 3000;

const isUTC = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const luzonTZ = DateTime.now().zoneName;
    const offset = new Date().getTimezoneOffset(); // in minutes

    return timezone === 'UTC' && luzonTZ === 'UTC' && offset === 0;
};

export const initApp = () => {
    if (!isUTC()) {
        console.log('Time is not UTC. Dont start the app.');
        slog.log('app', 'Time is not UTC. Dont start the app.');
        process.exit(1);
    }

    slog.log('app', 'init app');
    app = express();
    app.use(
        cors({
            // TODO have a proper local setup to avoid localhost in prod
            origin: ['https://apps.statox.fr', 'https://localhost:8080'],
            credentials: true // Required to let client send creds via the session cookie for passport auth
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

    for (const route of routes.list) {
        const pipeline = [];

        if (route.authentication === 'apikey-iot') {
            pipeline.push(validateAPIKeyHeader);
        } else if (route.authentication === 'user2') {
            pipeline.push(setPassportHeaders);
            // First configure how the sessions will be stored
            pipeline.push(doPassportSession);
            if (route.path === '/auth/login') {
                // The login endpoint creates the session and returns a session id in cookie
                pipeline.push(validatePassportAuth);
            } else if (route.path === '/auth/logout') {
                // The logout endpoint delete the session associated to the cookie
                pipeline.push(logoutPassportRequest);
            } else {
                // The other authenticated endpoints only check the session to authenticate the user
                pipeline.push(validatePassportSession);
                // Once the session populate the user, check the required scopes
                pipeline.push(validateEndpointScope(route.scope));
            }
        }

        if (route.method === 'post') {
            // Weird typing because we are using json-schema-to-ts's JSONSchema to type inputSchema in routes
            // but validate() expects the AllowedSchemas from express-json-validator-middleware
            // they just two ways to represent a json schema.
            // TODO: Reunify this
            pipeline.push(validate({ body: route.inputSchema as unknown as AllowedSchema }));
        }
        pipeline.push(apiPipeline(route));

        if (route.method === 'get') {
            app.get(route.path, pipeline);
        } else if (route.method === 'post') {
            app.post(route.path, pipeline);
        }
    }

    app.use(errorHandler);
    const server = app.listen(PORT, () => slog.log('app', 'App listening', { port: Number(PORT) }));
    configureServerTimeout(server);

    // Attach WebSocket server to the same HTTP server so that ws listen on the same port
    wss = new WebSocketServer({ server });
    initWsServer(wss);
    initOpenapi(routes.list);

    if (config.env.isProd) {
        startPeriodicTasks();

        // POTENTIALLY DANGEROUS
        // Added when configuring passport auth. I want to set the cookie to `secure`
        // so that only https frontend get the cookie. When running on heroku the app
        // doesn't set the cookie on the https frontend without this trust proxy setting
        // See the doc for details: https://expressjs.com/en/guide/behind-proxies.html
        app.set('trust proxy', true);
    }
};

const configureServerTimeout = (server: Server) => {
    // https://betterstack.com/community/guides/scaling-nodejs/nodejs-timeouts/
    // requestTimeout: limit for how long the server should wait to receive the entire request (including the body) from the client
    server.requestTimeout = config.timeouts.requestTimeout; // (default 300000)

    // headersTimeout: time allowed for receiving request headers from the client.
    server.headersTimeout = config.timeouts.requestTimeout; // (default 60000)

    // keepAliveTimeout: how long a server holds a connection open after responding to a request.
    // It's key for HTTP Keep-Alive, which allows multiple requests over a single connection, boosting efficiency.
    // It defaults to 5 seconds and if no additional request arrives within that time, the socket connection closes.
    // server.keepAliveTimeout = 3000; (default 5000)

    // timeout: limit the inactivity period (no data sent or received) on an established socket connection
    server.timeout = config.timeouts.socketTimeout; // (default 0 - no limit)
};
