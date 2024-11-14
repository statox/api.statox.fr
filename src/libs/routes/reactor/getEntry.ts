import { Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { GetRoute, RouteHandler } from '../types';
import { getRedirectForEntry } from '../../modules/reactor/getEntries';

const handler: RouteHandler<Input> = async (params) => {
    const { linkId } = params.input;
    params.loggableContext.addData('linkId', linkId);
    return getRedirectForEntry(linkId);
};

const customResponseHandler = (output: Output, res: Response) => {
    return res.redirect(output);
};

type Input = {
    linkId: string;
};

const outputSchema = {
    type: 'string',
    description: 'A S3 presigned URL to redirect to'
} as const;

type Output = FromSchema<typeof outputSchema>;

export const route: GetRoute<Input, Output> = {
    method: 'get',
    path: '/r/:linkId',
    handler,
    authentication: 'none',
    outputSchema,
    customResponseHandler
};
