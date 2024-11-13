import { Response } from 'express';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { emptyObjectSchema } from './helpers';

export type RouteHandler<Input> = (params: { input: Input }) => Promise<unknown>;

export type ApiJsonSchema = JSONSchema;

// TODO: Would it make more sense to have that as a single type? (probably yes)
export type EmptyInput = FromSchema<typeof emptyObjectSchema>;
export type EmptyOutput = FromSchema<typeof emptyObjectSchema>;

type BaseRoute<Input, Output> = {
    path: string;
    handler: RouteHandler<Input>;
    authentication: 'none' | 'user' | 'apikey-iot';
    outputSchema: ApiJsonSchema;
    // TODO at one point we might want to wrap the response in a custom object
    customResponseHandler?: (output: Output, res: Response) => void;
};

export type GetRoute<Input, Output> = BaseRoute<Input, Output> & {
    method: 'get';
};

export type PostRoute<Input, Output> = BaseRoute<Input, Output> & {
    method: 'post';
    inputSchema: ApiJsonSchema;
};

export type Route<Input, Output> = GetRoute<Input, Output> | PostRoute<Input, Output>;
