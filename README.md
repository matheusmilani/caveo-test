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

You migh use the Postman colleciton to easily check the payloads and requests from the application.

## AWS Services
The application uses the Cognito to allow the user registrations, login and allow to access routes.
The cognito was configured using the simple way of login (username and password), and accepts to enable/disable users.

The User Pool created:
![cognito](docs/images/cognito.png "Cognito")

The Groups allowed to sync with the users:
![cognito groups](docs/images/cognito-groups.png "Cognito Groups")

The groups might be sync with IAM users to have permissions on AWS resources, like specific access, management of resources, etc. 
For now, the groups are just to allow access on the endpoints from the application.

To manage the AWS resources, I created an IAM user with only Cognito full access:
![IAM user](docs/images/iam-user.png "IAM user")

## Docker
To run the docker, you might use the command line:
`docker compose -f "docker-compose.yml" up -d --build`
![Docker Command Line](docs/images/docker-command-line.png "Docker Command Line")

And after run with success, the application and the Postgre Database will run on containers:
![Docker](docs/images/docker-running.png "Docker")

## Endpoints:
The endpoints from the application you may find them on the Postman collection.
![Endpoints](docs/images/endpoints.png "Endpoints")

If the application runs without error, you might check on the main endpoint `http://localhost:3000/`, this one have no authentication:
![No auth](docs/images/no-auth.png "No auth")



