export class ConfigError extends Error {
    constructor(readonly service: string) {
        super('Missing config env variable');
    }
}
