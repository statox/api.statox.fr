/*
 * This file extends Express's types.
 * It was created to type the locals I add to the response in the middleware
 *
 * https://blog.logrocket.com/extend-express-request-object-typescript/
 *
 * It doesn't require to be added in a `file` or `include` property in `tsconfig.json`
 * as suggested by various sources because it is a simple module (due to the `export`
 * directive)
 *
 * With this file in the code I can access response.local.loggableContext with proper typing
 */

import { LoggableContext } from '../../modules/logging';

// This export is required to make the file a module
export {};

declare global {
    namespace Express {
        // All of these properties should probably be optional for two reasons:
        // 1. We add them to the Response only in a middleware, so trying to access them
        //    before the middleware is run would be an issue.
        // 2. I need to check but it's likely this Locals interface is used both by
        //    Response and Request but I only set my custom locals to Response objects
        //
        // Other considerations:
        // - Don't expend Express's Response but wrap them in my custom object instead?
        // - Don't use the locals but another custom property?
        export interface Locals {
            loggableContext: LoggableContext;
            requestId: string;
            startTimeNs: bigint;
            finished: boolean;
        }
    }
}
