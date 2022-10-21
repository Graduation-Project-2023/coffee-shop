# Coffee Shop

hosted on [AWS](http://coffee-shop.us-east-1.elasticbeanstalk.com/)

## Project Setup

- run `npm install` to install all dependencies
- run `npm start` to start the project
- run `npm run build` to build the project
- run `npm run docker:up` to start application, development database and test database in docker containers
- run `npm run migrate` to migrate schema to test database
- run `npm run test` to run the tests from local machine on test database

## API

### Authentication

- POST `/api/auth/signup` - body: `{ username, password, role }` - creates a new user
- POST `/api/auth/login` - body: `{ username, password }` - returns a JWT token
- POST `/api/auth/admin/login` - body: `{ username, password }` - returns a JWT token

### Products

- GET `/api/products` - get all products
- GET `/api/products/:id` - get a product by id
- POST `/api/products` - [admin token] body: `{ name, price, description?, image?, hasToppings }` - creates a new product
- PUT `/api/products/:id` - [admin token] body: `{ name?, price?, description?, hasToppings? }` - updates a product
- DELETE `/api/products/:id` - [admin token] - deletes a product

### Toppings

- GET `/api/toppings` - get all toppings
- GET `/api/toppings/:id` - get topping by id
- POST `/api/toppings` - [admin token] body: `{ name, price, image? }` - creates a new topping
- PUT `/api/toppings/:id` - [admin token] body: `{ name?, price?, image? }` - updates a topping
- DELETE `/api/toppings/:id` - [admin token] - deletes a topping

### Orders

- GET `/api/orders` - [admin token] - get all orders
- GET `/api/orders/:id` - [admin token] - get an order by id
- POST `/api/orders` - [user token] body: `{ items: [{ description, productId, size, sugar, price }] }` - creates a new order
- DELETE `/api/orders/:id` - [admin token] - deletes an order
