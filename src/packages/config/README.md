# Config

A package to parse and give access to the various configuration needed by the API.

## Sources

For now all configurations in production are coming from environment variables. Reading these variables is done in the [`sources`](./sources) directory, one file by configured service.

These sources files are responsible for defining which environment variable to read and which default values to use when not in prod. _(Maybe in the future we'll use a `.env` file for test/local, or we'll switch from env variables to a proper secret manager like Hashicorp vault)_

## Access

The [`parseConfig`](./services/parseConfig.ts) service is responsible for gathering the data provided by the source files in a `config` object which is access by the rest of the code.

## Validation

When parsing the config we validate it with a JSON schema and also use the schema to properly type the public `config` object

## Error handling

For now if the validation fails we `console.error` the error and throw, which will generate an uncaught. This is to avoid starting the app with an incorrect config.

Ideally we would like to have the error logged in ELK but the missing config can be the ELK access and I don't want to have a dependency of this package with the logger code. So for now we'll keep things this way and I'll see if I figure something better.
