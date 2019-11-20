# Diecast Collector Nodejs API

**diecast-collector-nodejs-api** Is a REST API developed with (guess what) **Node JS**. It's goal is to help me keep track of my miniature car collection (Hot Wheels, Maisto, California Collectibles, etc) and to provide a general use case for studying new technologies.
Also check out the [Web App](https://github.com/lbbedendo/diecast-collector-app) built with React. I've also developed a version of this API with [Micronaut Framework](https://micronaut.io/) (You can check the repository [here](https://github.com/lbbedendo/diecast-collector-api)).


## Technology Stack
- Nodejs and npm
- Express
- Sequelize
- PostgreSQL Database 

## Running the project
1. Create a ".env" file in the root folder with the content of the ".env.example" file
2. Create the databases for the "dev", "test" and "prod" environments and add the connection url and dialect to the ".env" file
2.1 Example: 
`DEV_DATABASE_URL=postgresql://user:password@localhost:5432/my_db`
`DATABASE_DIALECT=postgres`
3. Run the sequelize migration to create the tables and relationships: `npm run migrate`
4. Run the project with `npm run dev` to start it in the development environment

## Running the tests
1. You need to create a test database first and add the connection url to the ".env" file
2. Run the tests with `npm test`. The `test` command is already configured to run the migrations and seeds before the tests execution