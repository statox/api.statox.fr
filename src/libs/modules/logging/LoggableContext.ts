import { LoggableProperties } from './slog.js';

export class LoggableContext {
    loggedProperties: LoggableProperties;

    constructor() {
        this.loggedProperties = {};
    }

    addData<K extends keyof LoggableProperties>(prop: K, data: LoggableProperties[K]): void {
        this.loggedProperties[prop] = data;
    }

    getData() {
        return {
            ...this.loggedProperties
        };
    }
}
