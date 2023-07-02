# Express Authentication with AWS RDS

[![Actions Status](https://github.com/fabienhp/myproject/workflows/YourWorkflowName/badge.svg)](https://github.com/fabienhp/myproject/actions)

This project is a web application built with Express.js that uses an AWS RDS instance for data persistence.

## Prerequisites

Here are the prerequisites for running this project:

- Node.js
- Docker
- AWS RDS instance

## Application Setup

1. Clone repository :

```shell
git clone https://github.com/FabienHP/MyProject.git
```

2. Navigate to the Express server directory:

```shell
cd MyProject/src
```

3. Rename the .env.example:

```shell
mv .env.example .env
```

4. Fill the .env file with your information.

## Usage

### Development Environment

1. Navigate to the Express server directory:

```shell
cd MyProject/src
```

2. Install the dependencies:

```shell
npm install
```

3. Start the dev application:

```shell
npm run start

```

### Production Environment

1. Build the Docker image:

```shell
docker build -f ./deploy/prod/Dockerfile -t fabienhp/myproject:latest .
```

2. Run the Docker image:

```shell
docker run -d -p 80:8080 fabienhp/myproject:latest
```

### Unit Testing

To run unit tests, use the following command:

```shell
npm run test
```
