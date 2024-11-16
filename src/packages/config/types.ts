import { FromSchema } from 'json-schema-to-ts';
import { configSchema } from './services/schema.js';

export type Config = FromSchema<typeof configSchema>;
