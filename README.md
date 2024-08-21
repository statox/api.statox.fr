# statox backend

## Usage

```bash
# At clone time
npm install
npm run setup-githooks # Setup a post-merge githook to be alerted when dependabot merged a PR

# Working locally
npm run env # Start the docker environment
./src/tools/init-db.sh
npm run watch # Typescript watcher
npm run serve # Start the server locally on port 3000

# Deploying (Done from dev machine for now)
npm run heroku:login
npm run heroku:deploy
```

## TODO

-   [ ] Tests don't check for tokens. Find a way to test this part
-   [ ] Replace Auth0 with passport.js?
-   [ ] Enforce routes to return at least `{}` instead of nothing (otherwise it breaks apps.statox.fr -only on iOS-). For now returning `{}` is done manually in each endpoints.
-   [ ] Take inspiration from [this best practice guide](https://github.com/testjavascript/nodejs-integration-tests-best-practices) to rework how we call the API in tests, how we create the DB tables, etc...

## Environment

### Mysql

-   Dev: The database is configured on docker with `src/tools/docker-compose.yml`
-   Test: Also using a docker container but on a different port than the deb env
-   Prod: In prod we use the Heroku plugin [JawsDB Mysql](https://elements.heroku.com/addons/jawsdb)

To create the tables:

-   Add a table in `./src/tools/tables/[new-table].sql`
-   Run `./src/tools/init-db.sh [--prod]`
    -   Without any arguments the script connects to docker
    -   With `--prod` connects to prod db (Requires `npm run heroku:login`

### Elasticsearch

The cluster is used in two ways:

-   As a log repository: We use a custom logger [`slog`](./src/libs/modules/logging) which sends its logs to the configured ELK cluster in production (in other environments the logs are sent to stdout)
-   As an actual database, particularly for the `homeTracker` feature: We store the sensors data in the cluster and retrieve the data using the [official `@elastic/elasticsearch` client](https://www.npmjs.com/package/@elastic/elasticsearch)

How it runs

-   Dev: `slog` writes to stdout and the ELK cluster doesn't work (TODO have it in a docker container?)
-   Test: `slog` is mocked "manually" and `@elastic/elasticsearch` is mocked with the mock library provided by elastic.
-   Prod: The cluster runs on my own VPS (provisioned by [ansible playbook](https://github.com/statox/setup))

### Cloudflare R2 (S3 server)

S3 is too expensive for our usage so we use Cloudflare's R2 with the AWS S3 SDK.

-   Tests: Mocked with AWS's SDK
-   Dev: Mocked with localstack
-   Prod: R2

## CI
Dependabot is enabled on this repo and [a workflow](./.github/workflow/dependabot-auto-merge.yml) merges its PRs when they don't break anything. I took notes about this [in this blogpost](https://www.statox.fr/posts/2024/04/github_dependabot_auto_merge/)
