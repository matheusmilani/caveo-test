# Caveo App
## Objective
Configure a backend project with Node.JS and integrate with AWS Cognito. The tasks includes the configuration of a PostgreSQL Database, TypeORM and initialize of the development environmt with Docker Compose.

## Architecture
The system is separated by:
- entity: folder responsible to have all the models/entities correspondents with database
- helpers: folder responsible to have all the minor functions like decorators and validators
- migration: folder responsible to have the migrations from the database
- routes: folder responsible to have all the routes of the system, separated by responsabilities
- services: folder responsible to have connections with third parts
- subscriber: folder responsible to have the subscribers from the database

On the main path you will find the config files and server.js.

You will find the folder docs, on that folder you will find a Postman collection which was used on this application to test the scenarios.

## How to run
To run the project, you may run the Docker Compose, which will create both environments:
- Application
- Database

