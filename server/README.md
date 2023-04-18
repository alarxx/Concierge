## Concierge Back-end

## Getting Started
These instructions will help you start and run a copy of the project on your local computer for development and testing purposes.

Start with cloning this repo on your local machine:

```sh
$ cd directory
$ git clone https://github.com/alar-q/concierge.git
$ cd ./concierge
$ git switch bizup
$ cd ./server
```

## Для запуска в корне ./server нужно создать .env файл:

В него нужно вписать конфигурацию такого вида:

**.env**  

```dotenv
NODE_ENV=development

CLIENT_URL=http://localhost:9000
API_URL=http://localhost:3000

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/concierge_test

JWT_SECRET=supersecret
COOKIE_SECRET=secretcat

AZURE_IDENTITY_METADATA=https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
AZURE_CLIENT_ID=id
AZURE_CLIENT_SECRET=secret
AZURE_RESPONSE_TYPE=id_token
AZURE_RESPONSE_MODE=form_post
AZURE_REDIRECT_URL=http://localhost:3000/auth/azure/callback

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=address@gmail.com
SMTP_PASS=smtp_password
```

## Installation

To install and set up the libraries, run:
```sh    
$ npm install
```

## Usage

### Serving the app in development environment

```sh
$ npm start
```