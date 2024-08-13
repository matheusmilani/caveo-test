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

If you run the application with Docker, the PORT used is 3000, otherwise if use `node server.js`, the PORT used is the 1337.

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

### Sign Up
This endpoint allows to create a new user on Cognito.
It only creates the user, not sync with any group.
After create, the user might receive an email with a code. That code should be used on the next endpoint.
![SignUp](docs/images/signup.png "SignUp")

### Confirm Sign Up
This endpoint allows to confirm the registration of the user. It might be used to allows access or control some business requirements. 
![Confirm](docs/images/confirm.png "Confirm")

### Add User To Group
This endpoint assing an user with a group. That group is created on Cognito service and allows to control the endpoints access.
![add-to-group](docs/images/add-to-group.png "add-to-group")

### Sign In
This endpoint returns the token of an authenticated user. This token will be used on the authenticated endpoints.
![token](docs/images/token.png "token")

### Check Groups
This endpoint returns the endpoints that the user have access.
![check-groups](docs/images/check-groups.png "check-groups")

### Authenticated routes
The authenticated routes are explicits and returns if the user have access.
The token is not refreshed all the time that the user access an endpoint. 
![no-access](docs/images/no-access.png "no-access")
![access](docs/images/access.png "access")

### Signout
The endpoint `/signout` with the header `authorization` is responsible to invalidate the token.

### Credentials
The environment variables and credentials to test the application are:
```
NODE_ENV=development
PORT=1337
JWT_TOKEN = 'WIPqZeYf6Jtqryu64qbJxy42s18XSNqMo'
JWT_TOKEN_EXPIRATION = '8h'
AWS_CLIENT_ID = '7eavd7471kdsqgdgft00t0oiji'
AWS_USER_POOL_ID = 'us-east-2_r74BN3HeK'
AWS_REGION = 'us-east-2'
AWS_ACCESS_KEY_ID = 'AKIAS6J7QDMD3BK3X6ZC'
AWS_SECRET_ACCESS_KEY = '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'
```

### Enhancements
To a production application, the main enhancements are:
- Automated / unit / e2e tests with Jest or similar;
- Gitflow with validation of tests and deploy;
- Update version of AWS SDK from v2 to v3;
- Update the application with TypeScript;
- Swagger or similar to documentation of endpoints;
- Log system with CloudWatch or similar;
- Refresh the user information / token before the requests, so that the updates on AWS may be real time, even if the user didn't update the sign in token automatically.