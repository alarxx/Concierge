# Concierge Service 

> Консьерж-служба, предоставляющая широкий спектр услуг в сфере персонального менеджмента и консалтинга. Предоставляет услуги по требованию для клиентов, которые варьируются от руководителей бизнеса до сотрудников и частных лиц.

![Concierge Cat](https://github.com/Alar-q/Concierge/blob/main/meme/cat.jpg)

## General

* Локальная авторизация по требованию   
* Работа с сессиями, сохранение сессий в базе
* Локальное хранение файлов и их защита
* Процесс заказа с помощью multistep-form
* Спроектированная база данных 
* Защищенный API для взаимодействия Frontend-а с БД
* Динамичное обновление контента на клиенте
* Chat с разными типами сообщений (текст, формы, документы)
* Flight Tracker
* CRM

## Описание
[**Concierge Service**](https://github.com/Alar-q/Concierge) - это [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 "SPA") с архитектурой и структурой реализованной на стеке MERN.  

В целом, общей темой консьерж-сервиса является предоставление индивидуальной помощи и внимания к потребностям клиента, независимо от отрасли, в которой он предлагается.

Основная идея проекта - Консьерж-сервис — это индивидуальная помощь, оказываемая профессионалом, который стремится удовлетворить потребности и запросы клиента. Эту услугу можно найти в различных отраслях, таких как гостиничный бизнес, здравоохранение, недвижимость и путешествия. Консьерж выступает в качестве посредника между клиентом и услугами или продуктами, которые ему требуются, договариваясь, резервируя и предоставляя рекомендации для обеспечения удовлетворения потребностей клиента. Цель услуги — обеспечить беспрепятственный и беззаботный опыт для клиента, а консьерж выступает в качестве универсального магазина для всех их потребностей.

## Технологии
В процессе разработки front и back два отдельных приложения.  
React будет общаться с API через proxy.

Для прода SPA React собирается в 2 файла(html, js)   
и будет выдаваться сервером.

Инструкции, которые помогут вам запустить
[backend](https://github.com/Alar-q/Concierge/tree/main/backend#readme)
и [frontend](https://github.com/Alar-q/Concierge/tree/main/frontend#readme)  
проекта на вашем локальном компьютере для целей разработки  
и тестирования
смотреть в соответствующих README.

Здесь перечислены основные фреймворки и библиотеки, используемые в проекте. Полный список используемых технологий для каждой части проекта находится в файлах package.json в папках client и server.

#### Common
1. ES2019
2. [Git](https://git-scm.com/book/ru/v1/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-Git "Git")
3. [REST API](https://www.restapitutorial.com/lessons/restquicktips.html "REST API")
4. [Socket.IO](https://socket.io/docs/ "Socket.IO")
5. [npm](https://en.wikipedia.org/wiki/Npm_(software))

#### Frontend
1. [React](https://reactjs.org/docs/getting-started.html "React")
2. [React Context](https://reactjs.org/docs/context.html "React Context")
3. [React Router](https://www.w3schools.com/react/react_router.asp "React Router")

#### Backend
1. [Node.js](https://nodejs.org/en/ "Node.js")
2. [Express](https://expressjs.com/ru/guide/routing.html "Express")
3. [Passport.js](http://www.passportjs.org/docs/ "Passport.js")
4. [mongoose](https://mongoosejs.com/ "mongoose")
5. [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypt")
6. [Babel](https://babeljs.io/docs/en/index.html "Babel")
7. [nodemon](https://www.npmjs.com/package/nodemon "nodemon")

#### Database
1. [MongoDB](https://www.mongodb.com/ "MongoDB")


## Built With

* MongoDB
* Express JS
* React
* Node JS
* Love

## Authors

* **Alar** - [Alar-q](https://github.com/alar-q) - [@alar4j](https://t.me/alar4j)
* **Ayan** - [Ualiyevvv](https://github.com/ualiyevvv) - [@mitxp](https://t.me/mitxp)
* **Dina** - [Dina](https://github.com/DanDina777) - [@dandi_w](https://t.me/dandi_w)

See also the list of [contributors](https://github.com/alar-q/concierge/contributors) who participated in this project.

## Team
```
██████╗ ███████╗███╗   ██╗ █████╗ ██╗███████╗███████╗ █████╗ ███╗   ██╗ ██████╗███████╗   
██╔══██╗██╔════╝████╗  ██║██╔══██╗██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝██╔════╝    
██████╔╝█████╗  ██╔██╗ ██║███████║██║███████╗███████╗███████║██╔██╗ ██║██║     █████╗    
██╔══██╗██╔══╝  ██║╚██╗██║██╔══██║██║╚════██║╚════██║██╔══██║██║╚██╗██║██║     ██╔══╝    
██║  ██║███████╗██║ ╚████║██║  ██║██║███████║███████║██║  ██║██║ ╚████║╚██████╗███████╗     
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝    
```

## License
▄───▄  
█▀█▀█  
█▄█▄█  
─███──▄▄  
─████▐█─█  
─████───█  
─▀▀▀▀▀▀▀  