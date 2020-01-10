<p align="center">
  <a href="https://retyp.app/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://avatars2.githubusercontent.com/u/59448556?s=400&v=4" alt="retyp's logo">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.com/retyp/retyp-api"><img src="https://travis-ci.com/retyp/retyp-api.svg?branch=develop" alt="Build status of develop branch"></a>
  <!-- <a href='https://coveralls.io/github/retyp/retyp-api?branch=develop'><img src='https://coveralls.io/repos/github/retyp/retyp-api/badge.svg?branch=develop' alt='Coverage Status' /></a> -->
  <a href="https://www.codacy.com/gh/retyp/retyp-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=retyp/retyp-api&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/c071879b3bf54740aee1ad8f206edb08"/></a>
  <br>
  <a href="https://dependabot.com/"><img src="https://api.dependabot.com/badges/status?host=github&amp;repo=retyp/retyp-api" alt="Dependabot status"></a>
  <a href="https://dependabot.com/"><img src="https://img.shields.io/david/retyp/retyp-api.svg?maxAge=3600" alt="Dependencies status"></a>
  <br>
</p>

<h2 align="center">RETYP API</h2>

---

## Introduction

This repository hosts the source code of Retyp's API. This API provides both public and private endpoints, used to enable developers to programmatically create/read pastes and for users authentication & other features...

You can go through [Retyp's API documentation](https://docs.api.retyp.app/) to get more informations about the public endpoint that you can use.

## Ecosystem

Retyp's API is built with the following tools :

| Library          | Version | Description                                                                                      |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------ |
| [Node.js]        | 12.13.1 | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.                         |
| [Adonis.js]      | 4.1.0   | The Node.js Framework highly focused on developer ergonomics, stability and confidence.          |
| [PostgreSQL]     | 9.6.16  | The World's Most Advanced Open Source Relational Database.                                       |

**(Non-exhaustive list, only the main libraries & tools are listed)*

## Installation

* Install both docker-ce & docker-compose
* Create a `.env` file based of the `.env.example` one you can find at the root of the repository

## Start

To start the application you can:
* Run `docker-compose -f docker-compose.dev.yml up` which will start the API with a PostgreSQL & Redis instance.

But you can also run:
* Lint : `npm run lint` (link all source code thanks to [ESLint](https://github.com/eslint/eslint))
* Tests : `npm run test` (runs both unit and functional tests thanks to [adonis-vow](https://github.com/adonisjs/adonis-vow))
* Production : `npm run start` (runs the app with node, there are no process manager included)
* Development : `npm run dev` (runs the app in development mode (with HR and stuff...))

[Node.js]: https://github.com/nodejs/node
[Adonis.js]: https://github.com/adonisjs/adonis-framework
[PostgreSQL]: https://www.postgresql.org

