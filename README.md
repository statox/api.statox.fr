# statox backend

## Usage

For now everything is done locally

```bash
npm install

# Working locally
npm run env # Start the docker environement
./src/tools/init-db.sh
npm run watch # Typescript watcher
npm run serve # Start the server locally on port 3000

# Deploying
npm run heroku:login
npm run heroku:deploy
```

## TODO

-   [ ] Tests don't check for tokens. Find a way to test this part
-   [ ] Replace Auth0 with passport.js?

## Database

-   Dev: The database is configured on docker with `src/tools/docker-compose.yml`
-   Prod: In prod we use the Heroku plugin [JawsDB Mysql](https://elements.heroku.com/addons/jawsdb)

To create the tables:

-   Add a table in `./src/tools/tables/[new-table].sql`
-   Run `./src/tools/init-db.sh [--prod]`
    -   Without any arguments the script connects to docker
    -   With `--prod` connects to prod db (Requires `npm run heroku:login`
