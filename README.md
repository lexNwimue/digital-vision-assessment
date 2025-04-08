<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![CI Status](https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)](https://circleci.com/gh/nestjs/nest)
[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![Package License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI Build](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)
[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Support us on Open Collective](https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg)](https://opencollective.com/nest#sponsor)

# Digital Vision Assessment

This repository demonstrates a user management system built using the [NestJS framework](https://nestjs.com/) with TypeScript. It includes user registration, authentication with JWT, and other basic user management features, all set up and tested in a secure, scalable architecture.

## Features

- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Biometric Login Support**: Integration for biometric key-based login (with hash verification).
- **User CRUD Operations**: Ability to create, retrieve, and manage users, along with conflict checks.
- **GraphQL Integration**: Seamlessly integrates with GraphQL for querying user data.

## Project Setup

Clone the repository and install the dependencies:

```bash
$ git clone https://github.com/your-project/repository-name.git
$ cd repository-name
$ yarn install
```

## Environment Variables

Ensure you set up your environment variables before running the project. Create a .env file in the root directory with the following (sample) configurations:

```bash
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-jwt-secret-key
```

## Compile and Run the Project

Run the project in different modes as needed:

```bash
# development mode
$ yarn run start

# watch mode (auto-restarts on changes)
$ yarn run start:dev

# production mode (optimized build)
$ yarn run start:prod

```

## Running Tests

Run all unit tests, end-to-end (e2e) tests, or check code coverage:

```bash
# Run all unit tests
$ yarn run test

# Run e2e tests
$ yarn run test:e2e

# Check test coverage
$ yarn run test:cov
```

## Stay in Touch

- **Author** - Lex Nwimue
- **Twitter** - [@lex_nwimue](https://x.com/lex_nwimue)
- **LinkedIn** - [lexNwimue](https://linkedin.com/in/lexnwimue)

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
