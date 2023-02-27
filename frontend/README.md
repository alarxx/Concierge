# Concierge front-end
> Front-end проекта Concierge

## Getting Started
Эти инструкции помогут вам запустить и запустить копию проекта на вашем локальном компьютере для целей разработки и тестирования.

Start with cloning this repo on your local machine:

```sh
$ cd directory
$ git clone https://github.com/Alar-q/Concierge.git
$ cd ./Concierge/frontend
```

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
$ npm run build
```

### Технологии
1. [npm](https://en.wikipedia.org/wiki/Npm_(software) "npm")
2. [webpack](https://webpack.js.org/ "webpack")
3. [babel](https://babeljs.io/ "babel")
4. [React](https://reactjs.org/docs/getting-started.html "React")
5. [React Context](https://reactjs.org/docs/context.html "React Context")
6. [React Router](https://www.w3schools.com/react/react_router.asp "React Router")
7. [Socket.io-client](https://socket.io/docs/v4/client-api/ "Socket.IO-Client")
8. [react-svg-loader](https://www.npmjs.com/package/react-svg-loader "react-svg-loader")
9. [webpack-dev-server](https://webpack.js.org/configuration/dev-server/ "DevServer")

## Doc 

В процессе разработки React будет отдельным сервером запускаемым на DevServer и общаться с API через proxy, из-за чего нужно включать CORS.  
В производстве React будет "компилироваться" и отдаваться с backend-сервера с отключенным CORS.

Все приложение обернуто AppContext - React Context, в котором хранятся обработчики работы с websocket, логики авторизации, логики обработки сообщений в мессенджере и обработки других персистентных данных.  

Хоть приложение и является SPA, оно работает URL сторокой браузера с помощью React Router, и, например, не требует перезагрузки страницы при переходе на определенный маршрут, что увеличивает скорость отображения для клиента. 
