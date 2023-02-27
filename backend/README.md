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
$ npm start
```

### Building a distribution version

```sh
$ npm start --production
```
---

## Технологии
1. [npm](https://en.wikipedia.org/wiki/Npm_(software) "npm")
2. [Node.js](https://nodejs.org/en/ "Node.js")
3. [Express](https://expressjs.com/ru/guide/routing.html "Express")
4. [Passport.js](http://www.passportjs.org/docs/ "Passport.js")
5. [mongoose](https://mongoosejs.com/ "mongoose")
6. [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypt")
7. [Babel](https://babeljs.io/docs/en/index.html "Babel")
8. [nodemon](https://www.npmjs.com/package/nodemon "nodemon")
9. [Socket.IO](https://socket.io/docs/ "Socket.IO")
10. [express-fileupload](https://www.npmjs.com/package/express-fileupload "express-fileupload")
11. [express-session](https://www.npmjs.com/package/express-session "https://www.npmjs.com/package/express-session")
12. [body-parser](https://www.npmjs.com/package/body-parser "body-parser")
13. [cors](https://www.npmjs.com/package/cors "cors")
14. [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session "connect-mongodb-session")

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

## Doc

/models - директория с описанием моделей, их полей и их поведения  

&emsp; ./logPlugin.js - модуль, промежуточное ПО ODM для логирования создания у удаления документа из базы данных.  

&emsp; ./updateDate.js - модуль, промежуточное ПО ODM для обновления даты последнего изменения документа.  

&emsp; ./modelsManager.js - модуль решающий проблему классов зависящих друг от друга, вместо этого мы работаем не с классом, а с объектом класса.    

---

/websocket - директория для работы с websocket  

&emsp; ./socket.io.js - модуль инициализации сервера слушателя websocket.  

&emsp; ./listener - директория со всеми методами общения (слушатели) с клиентом. В нашем случае их немного, так как у нас есть REST API: whoami, send-message, delete-notifications, join-conversation.  

&emsp; ./observer - директория со всеми наблюдателями изменения моделей, каждый модуль является промежуточным ПО ODM mongoose, обеспечивает актуальность данных на клиенте.

---

/routes - директория с маршрутами REST API и указанием обработчиков маршрутов.  

---

/controllers - директория с обработчиками маршрутов.  

&emsp; ./controller.js - универсальный обработчик маршрута, если правильно описать модель, то можно пользоваться его методами, плюс в том, что мы можем изменить или добавить промежуточных ПО, в таком случае обработчик будет выглядеть так: 

```js
const HotelModel = require('../../../models/services/hotel/Hotel'); // Нам нужен сам "класс" модели, а не его объект

const hotelController = require('../../controller')({Model:HotelModel});

// hotelController.create = async (req, res)=>{...}
// hotelController.filesValidation = async (req, res, next)=>{...}

module.exports = hotelController;
```  

Если пользуемся универсальным controller-ом, то  
обязательные методы при построении схемы модели - onCreate, deepDelete,  
и необязательно статичные методы publicFiles и nestedObjectKeys,  
которые указывают как работать с определенными ключами.

File особенная модель, только она работает с файловой системой. У File 3 функции: 2 static функции createFile(file, user)   
и deepDeleteById(id), которая внутри пользуется методом deepDelete.

---

/config - обязательная директория заменяющая эквивалент .env файла, входит в .gitignore, подробнее тут - [Getting Started](#getting-started)

