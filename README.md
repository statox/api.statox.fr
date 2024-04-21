# statox backend

## Usage

```bash
# At clone time
npm install
npm run setup-githooks # Setup a post-merge githook to be alerted when dependabot merged a PR

# Working locally
npm run env # Start the docker environement
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
-   [ ] Enfore routes to return at least `{}` instead of nothing (otherwise it breaks apps.statox.fr -only on iOS-). For now returning `{}` is done manually in each endpoints.

## Database

-   Dev: The database is configured on docker with `src/tools/docker-compose.yml`
-   Prod: In prod we use the Heroku plugin [JawsDB Mysql](https://elements.heroku.com/addons/jawsdb)

To create the tables:

-   Add a table in `./src/tools/tables/[new-table].sql`
-   Run `./src/tools/init-db.sh [--prod]`
    -   Without any arguments the script connects to docker
    -   With `--prod` connects to prod db (Requires `npm run heroku:login`

## CI

Dependabot is enabled on this repo and [a workflow](./.github/workflow/dependabot-auto-merge.yml) merges its PRs when they don't break anything. I took notes about this [in this blogpost](https://www.statox.fr/posts/2024/04/github_dependabot_auto_merge/)
