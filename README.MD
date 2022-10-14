# Beverage Store

## Project Setup

- run `npm install` to install all dependencies
- run `npm start` to start the project
- run `npm run build` to build the project
- run `npm run test` to run the tests

## Database Setup

- Run docker-compose up to start the database
- Run docker-compose down to stop the database
- Run npx prisma migrate dev --name init to create the database schema
- Run npx prisma migrate reset to reset database
- Run docker exec -it postgres psql -U postgres -d postgres to connect to the database
