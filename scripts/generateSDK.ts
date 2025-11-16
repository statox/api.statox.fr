#!/usr/bin/env tsx

/**
 *  Generate a typescript source file to be added to my frontend codebase.
 *
 *  11/2025 This whole tool is my first serious try at agentic code generation.
 *  I have already refined the output and fixed various typing issues.
 *  The README is largely LLM generated, I'm curious to see how it ages.
 *
 *  To be used with the npm helper:
 *
 *      npmr generate:sdk ../apps.statox.fr/src/vendor/statox-api
 */

import fs from 'fs';
import path from 'path';
import { routes } from '../src/libs/routes/index.js';
import type { ApiJsonSchema, Route } from '../src/libs/routes/types.js';

interface GroupedRoute {
    module: string;
    name: string;
    method: 'get' | 'post';
    path: string;
    inputSchema?: ApiJsonSchema;
    outputSchema: ApiJsonSchema;
    authentication: string;
}

// Group routes by module (first part of path)
function groupRoutes(routesList: Route<unknown, unknown>[]): Map<string, GroupedRoute[]> {
    const grouped = new Map<string, GroupedRoute[]>();

    for (const route of routesList) {
        // Extract module and name from path: /homeTracker/getDashboard -> module: homeTracker, name: getDashboard
        const pathParts = route.path.split('/').filter((p) => p && !p.startsWith(':'));

        let module = pathParts[0] || 'root';
        let name = pathParts.slice(1).join('_') || 'index';

        // Special handling for single-part paths
        if (pathParts.length === 1) {
            module = 'misc';
            name = pathParts[0];
        }

        // Remove special characters (dots, hyphens, etc) and replace with underscores
        name = name.replace(/[^a-zA-Z0-9_]/g, '_');

        // Convert to camelCase
        name = name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

        const groupedRoute: GroupedRoute = {
            module,
            name,
            method: route.method,
            path: route.path,
            inputSchema: route.method === 'post' ? route.inputSchema : undefined,
            outputSchema: route.outputSchema,
            authentication: route.authentication
        };

        if (!grouped.has(module)) {
            grouped.set(module, []);
        }
        grouped.get(module)!.push(groupedRoute);
    }

    return grouped;
}

// Generate TypeScript type from schema
// TODO Remove the schema argument
function generateTypeFromSchema(_schema: ApiJsonSchema, name: string): string {
    // For simple schemas, generate inline types
    // For complex ones, we'll use the schema directly with FromSchema
    return `FromSchema<typeof schemas.${name}>`;
}

// Generate the SDK client code
function generateSDK(groupedRoutes: Map<string, GroupedRoute[]>): string {
    const moduleImplementations: string[] = [];
    const allSchemas: { [key: string]: ApiJsonSchema } = {};

    for (const [module, routes] of groupedRoutes) {
        const methods: string[] = [];

        for (const route of routes) {
            const inputSchemaName = `${module}_${route.name}_Input`;
            const outputSchemaName = `${module}_${route.name}_Output`;

            // Store schemas
            if (route.inputSchema) {
                allSchemas[inputSchemaName] = route.inputSchema;
            }
            allSchemas[outputSchemaName] = route.outputSchema;

            // Generate method signature
            const hasInput = route.method === 'post' && route.inputSchema;
            const inputType = hasInput
                ? generateTypeFromSchema(route.inputSchema!, inputSchemaName)
                : 'void';
            const outputType = generateTypeFromSchema(route.outputSchema, outputSchemaName);

            const inputParam = hasInput ? `input: ${inputType}` : '';
            const pathParams = extractPathParams(route.path);

            let params = inputParam;
            if (pathParams.length > 0) {
                const pathParamsType = `{ ${pathParams.map((p) => `${p}: string`).join(', ')} }`;
                params = params
                    ? `${params}, params: ${pathParamsType}`
                    : `params: ${pathParamsType}`;
            }

            // Generate method implementation
            methods.push(`
    /**
     * ${route.method.toUpperCase()} ${route.path}
     * Authentication: ${route.authentication}
     */
    ${route.name}: async (${params}): Promise<${outputType}> => {
        ${hasInput ? `validateInput(schemas.${inputSchemaName}, input, '${module}.${route.name}');` : ''}

        const path = '${route.path}'${pathParams.length > 0 ? pathParams.map((p) => `.replace(':${p}', params.${p});`).join('\n        ') : ''};

        const response = await this.fetch(
            path,
            ${
                hasInput
                    ? `{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            }`
                    : `{ method: 'GET' }`
            }
        );

        const output = await response.json();
        validateOutput(schemas.${outputSchemaName}, output, '${module}.${route.name}');
        return output as ${outputType};
    }`);
        }

        moduleImplementations.push(`
  ${module} = {${methods.join(',\n')}
  };`);
    }

    // Generate complete SDK file
    return `/**
 * AUTO-GENERATED SDK for api.statox.fr
 * Generated on: ${new Date().toISOString()}
 *
 * DO NOT EDIT THIS FILE DIRECTLY
 * Run: npm run generate:sdk
 */

import Ajv, { type ValidateFunction } from 'ajv';
import type { FromSchema } from 'json-schema-to-ts';

// Schemas
export const schemas = ${JSON.stringify(allSchemas, null, 2)} as const;

// AJV setup
const ajv = new Ajv();
const validators: Map<string, ValidateFunction> = new Map();

function getValidator(schema: any, key: string): ValidateFunction {
    if (!validators.has(key)) {
        validators.set(key, ajv.compile(schema));
    }
    return validators.get(key)!;
}

function validateInput(schema: any, data: unknown, endpoint: string): void {
    const validator = getValidator(schema, \`input_\${endpoint}\`);
    if (!validator(data)) {
        throw new Error(\`Invalid input for \${endpoint}: \${ajv.errorsText(validator.errors)}\`);
    }
}

function validateOutput(schema: any, data: unknown, endpoint: string): void {
    const validator = getValidator(schema, \`output_\${endpoint}\`);
    if (!validator(data)) {
        console.warn(\`Invalid output for \${endpoint}: \${ajv.errorsText(validator.errors)}\`);
    }
}

// API Client
export interface APIClientConfig {
    baseURL: string;
    credentials?: RequestCredentials;
    onError?: (error: Error, endpoint: string) => void;
}

export class APIClient {
    private baseURL: string;
    private credentials: RequestCredentials;
    private onError?: (error: Error, endpoint: string) => void;

    constructor(config: APIClientConfig) {
        this.baseURL = config.baseURL.replace(/\\/$/, ''); // Remove trailing slash
        this.credentials = config.credentials || 'include';
        this.onError = config.onError;
    }

    private async fetch(path: string, options: RequestInit = {}): Promise<Response> {
        const url = \`\${this.baseURL}\${path}\`;

        try {
            const response = await fetch(url, {
                ...options,
                mode: 'cors',
                credentials: this.credentials
            });

            if (!response.ok) {
                const error = new Error(\`HTTP \${response.status}: \${response.statusText}\`);
                this.onError?.(error, path);
                throw error;
            }

            return response;
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.onError?.(err, path);
            throw err;
        }
    }
${moduleImplementations.join('\n')}
}

// Type exports for convenience
${Array.from(groupedRoutes.entries())
    .flatMap(([module, routes]) =>
        routes.flatMap((route) => {
            const types = [];
            if (route.inputSchema) {
                types.push(
                    `export type ${capitalizeFirst(module)}_${capitalizeFirst(route.name)}_Input = FromSchema<typeof schemas.${module}_${route.name}_Input>;`
                );
            }
            types.push(
                `export type ${capitalizeFirst(module)}_${capitalizeFirst(route.name)}_Output = FromSchema<typeof schemas.${module}_${route.name}_Output>;`
            );
            return types;
        })
    )
    .join('\n')}
`;
}

function extractPathParams(path: string): string[] {
    const matches = path.match(/:([a-zA-Z0-9_]+)/g);
    return matches ? matches.map((m) => m.slice(1)) : [];
}

function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Main execution
function main() {
    const outputDir = process.argv[2] || './generated';
    const outputFile = path.join(outputDir, 'index.ts');

    console.log('🚀 Generating SDK...');
    console.log(`📊 Found ${routes.list.length} routes`);

    const groupedRoutes = groupRoutes(routes.list);
    console.log(`📦 Grouped into ${groupedRoutes.size} modules`);

    const sdkContent = generateSDK(groupedRoutes);

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write SDK file
    fs.writeFileSync(outputFile, sdkContent);

    console.log(`✅ SDK generated successfully!`);
    console.log(`📄 Output: ${outputFile}`);
    console.log(`\nModules:`);
    for (const [module, routes] of groupedRoutes) {
        console.log(`  - ${module} (${routes.length} endpoints)`);
    }
}

main();
