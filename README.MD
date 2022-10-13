# Beverage Store

## Project Setup

- run `npm install` to install all dependencies
- run `npm start` to start the project
- run `npm run build` to build the project
- run `npm run test` to run the tests

## Database Setup

- Create development and testing databases
- Create a database user
- Grant all privileges on both databases to the new user
- Create a `database.json` file in root directory
- Install `db-migrate` and `db-migrate-pg` packages
- Create a `migrations` folder in root directory
- Create a new migration using command `db-migrate create <migration-name>`
- Move up and down test migrations using `db-migrate --env test up` and `db-migrate --env test down`
