import { Response } from 'express';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { WebSocket } from 'ws';
import { emptyObjectSchema } from './helpers.js';
import { LoggableContext } from '../modules/logging/index.js';

export type RouteHandler<Input> = (params: {
    input: Input;
    loggableContext: LoggableContext;
    authenticatedUser?: Express.User;
}) => Promise<unknown>;

export type ApiJsonSchema = JSONSchema;

// TODO: Would it make more sense to have that as a single type? (probably yes)
export type EmptyInput = FromSchema<typeof emptyObjectSchema>;
export type EmptyOutput = FromSchema<typeof emptyObjectSchema>;

// List of possible scopes
export const SCOPES = ['public', 'admin', 'homeTracker'] as const;
type ScopesType = typeof SCOPES;
export type Scope = ScopesType[number];

type BaseRouteCommon<Input, Output> = {
    path: string;
    handler: RouteHandler<Input>;
    outputSchema: ApiJsonSchema;
    // TODO at one point we might want to wrap the response in a custom object
    customResponseHandler?: (output: Output, res: Response) => void;
};

type BaseRouteUser2<Input, Output> = BaseRouteCommon<Input, Output> & {
    // Routes with authentication type user2 must have a scope
    authentication: 'user2';
    scope: Scope;
};

type BaseRouteNotUser2<Input, Output> = BaseRouteCommon<Input, Output> & {
    // Routes with authentication type different than user2 must not have a scope
    authentication: 'none' | 'user' | 'apikey-iot';
    scope?: never;
};

export type BaseRoute<Input, Output> =
    | BaseRouteUser2<Input, Output>
    | BaseRouteNotUser2<Input, Output>;

export type GetRoute<Input, Output> = BaseRoute<Input, Output> & {
    method: 'get';
};

export type PostRoute<Input, Output> = BaseRoute<Input, Output> & {
    method: 'post';
    inputSchema: ApiJsonSchema;
};

export type Route<Input, Output> = GetRoute<Input, Output> | PostRoute<Input, Output>;

export type RouteWS = {
    onConnection: (ws: WebSocket, gameId: string) => void;
    path: string;
};
