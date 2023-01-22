# Concierge back-end
> Back-end проекта Concierge

## Getting Started
Эти инструкции помогут вам запустить и запустить копию проекта на вашем локальном компьютере для целей разработки и тестирования.

Start with cloning this repo on your local machine:

```sh
$ cd directory
$ git clone https://github.com/Alar-q/Concierge.git
$ cd ./Concierge/backend
```

## Для запуска в папке config нужно создать 2 файла:  

**.credentials.development.json**  
**.credentials.production.json**  

В каждый из них нужно вписать такой json:  
```json
{
  "cookieSecret": "secret concierge cat",
  "dbUri": "mongodb://127.0.0.1:27017/concierge"
}
```

---

## Installation

To install and set up the library, run:
```sh    
$ npm install
```

## Usage

### Serving the app in development environment

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```
---


## API
```
/auth
/auth/login (POST)
/auth/register (POST)
/auth/logout (DELETE)
/file/:id (GET)
/api
/api/company (CRUD)
/api/hotel (CRUD)
/api/hotel/service (CRUD)
/api/hotel/booking (CRUD)
/api/service?id=&id= (GET)
/api/booking?id=&id= (GET)
/api/order (CRUD)
```
Если пользуемся универсальным controller-ом, то  
обязательные методы при построении схемы модели - onCreate, deepDelete  
и "такие себе" в гибкости статичные методы publicFiles и nestedObjectKeys,  
которые указывают как работать с определенными ключами.  
Модели User и File особенные.  
У File 3 метода: 2 static метода createFile(file, user)   
и deepDeleteById(id), которая внутри пользуется методом deepDelete.
  
▄───▄  
█▀█▀█  
█▄█▄█  
─███──▄▄  
─████▐█─█  
─████───█  
─▀▀▀▀▀▀▀  
