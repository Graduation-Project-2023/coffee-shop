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

- GET `/api/products` - get all products
- GET `/api/products/:id` - get product by id
- POST `/api/products` - create product (admin only)
- PUT `/api/products/:id` - update product (admin only)
- DELETE `/api/products/:id` - delete product (admin only)

- GET `/api/toppings` - get all toppings
- GET `/api/toppings/:id` - get topping by id
- POST `/api/toppings` - create topping (admin only)
- PUT `/api/toppings/:id` - update topping (admin only)
- DELETE `/api/toppings/:id` - delete topping (admin only)

- GET `/api/orders` - get all orders (admin only)
- GET `/api/orders/:id` - get order by id (admin only)
- POST `/api/orders` - create order (user only)
- PUT `/api/orders/:id` - update order (user only)
- DELETE `/api/orders/:id` - delete order (admin only)
- GET `/api/orders/user/:id` - get orders by user id (user only)
