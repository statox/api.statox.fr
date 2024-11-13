import { AllowedSchema } from 'express-json-validator-middleware';
import { JSONSchema } from 'json-schema-to-ts';

export type RouteHandler<Input> = (params: { input: Input }) => Promise<unknown>;

export type ApiJsonSchema = JSONSchema;

type BaseRoute<Input> = {
    path: string;
    handler: RouteHandler<Input>;
    authentication: 'none' | 'user' | 'apikey-iot';
    outputSchema: AllowedSchema;
};

export type GetRoute<Input = null> = BaseRoute<Input> & {
    method: 'get';
};

export type PostRoute<Input> = BaseRoute<Input> & {
    method: 'post';
    inputSchema: ApiJsonSchema;
};

export type Route<Input> = GetRoute<Input> | PostRoute<Input>;
