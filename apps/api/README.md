# Obiemoney-API

A comprehensive financial management API built with Node.js, TypeScript, and PostgreSQL.

## Dependencies:
- Node 20>= (javascript runtime)
- PostgreSQL (database)
- Docker (for unit testing, containerization)
- Sonar scanner (Optional)

## Features

- User authentication and authorization
- Account management (checking, savings, credit, investment)
- Transaction tracking and categorization
- Budget creation and monitoring
- Financial reporting and analytics
- RESTful API design
- TypeScript for type safety
- Comprehensive testing suite

## Development

1. Create a `.env` file using `.env.sample` and fill your database details.

2. Start the app

    `npm start -- --migrate clean_and_migrate`
    
If everything goes well, you should see the app at `localhost:8080`.

## JWT Key Pair

- For authentication of secured api routes we have used JWT tokens.
- For creation and verification of JWT token we have user ES512 algorithm.
  
  Commands to create JWT token key pair.

  `openssl ecparam -genkey -name secp521r1 -noout -out jwt-private.pem`

  `openssl ec -in jwt-private.pem -pubout > jwt-public.pem`

- After getting the public and private keys, update them in the `.env` file 
- While updating use double quotes to escape the newlines, it should look like

    ```sh
    JWT_PRIVATE_KEY="-----BEGIN EC PRIVATE KEY-----
    Some key string here"
    ```

## NPM Scripts

1. `npm run create:migration YOUR_MIGRATION_NAME`
   
   This command will create your migration in migrations directory along with up and down migration SQLs in migrations/sqls directory.

2. `npm run db:migrate`
   
    This command will run your up migration in migrations directory.

3. `npm run db:migrate-down`
   
    This command will run your down migration in migrations directory. All of the down migrations work identically to the up migrations by substituting the word down for up.

4. `npm run db:clean`

    This command will clean your database. It uses down migration to clean up the database.

5. `npm start`
   
    Starts the development server

6. `npm start -- --migrate migrate`

    This command will start your application and run migrations before starting server.

7. `npm start -- --migrate clean_and_migrate`

    This command will start your application and clean db plus run migrations before starting server.

8. `npm run lint`

    This command would show you linting errors in console log.

## API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Password reset request
- `POST /api/reset-password` - Password reset

### Accounts
- `GET /api/financial/account/filter` - Get user accounts
- `POST /api/financial/account` - Create new account
- `PUT /api/financial/account/:id` - Update account
- `DELETE /api/financial/account/:id` - Delete account
- `GET /api/financial/account/:id/balance` - Get account balance

### Transactions
- `GET /api/financial/transaction/filter` - Get transactions
- `POST /api/financial/transaction` - Create transaction
- `PUT /api/financial/transaction/:id` - Update transaction
- `DELETE /api/financial/transaction/:id` - Delete transaction

### Budgets
- `GET /api/financial/budget/filter` - Get budgets
- `POST /api/financial/budget` - Create budget
- `PUT /api/financial/budget/:id` - Update budget
- `DELETE /api/financial/budget/:id` - Delete budget

## Unit testing
We use jest do the unit testing along with a library called [testcontainers](https://testcontainers.com/getting-started/) which can be used instead avoid mocking database connection.

1. This library requires docker to be setup properly. this library will create disposable database containers for us to use new database for every test suite
2. Create a directory called `tests` if did not exists
3. Create test files to cover up a file. for example if there is a file called `commonFunctions.js` create a test for it. It should be in `fileName.test.js`
4. use a `describe` block for a function.
5. Running `npm run test` will run all the unit test with coverage which will be later used in static code analysis tools like SonarQube.

## Docker

You can refer [this](https://docs.docker.com/engine/install/linux-postinstall/) step to run docker without adding `sudo` by either adding the current
user to the `docker` user group or using rootless mode

If you wish to use docker to start this app, run the following command:

1. `sudo docker-compose up` or `docker-compose up`

    (assuming docker and docker-compose is pre-installed on the system)

    This command will initialize the containers and run the containers using `docker-compose.yml` file.

2. If everything goes well, you should see the app at `localhost:8080`.

3. To clean up all the running docker container, run the following command:
    
    `sudo docker-compose down` or `docker-compose down`
