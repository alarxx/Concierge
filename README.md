# Concierge Service

> Консьерж-служба, предоставляющая широкий спектр услуг в сфере персонального менеджмента и консалтинга. Предоставляет услуги по требованию для клиентов, которые варьируются от руководителей бизнеса до сотрудников и частных лиц.

![logo alt](https://github.com/Alar-q/Concierge/blob/dev/presentation/landing.png)

## Live Demo

[APC Stage](https://www.youtube.com/watch?v=-YloE9LHJfY)

[After co-operation](https://www.youtube.com/watch?v=jLCZrODe3J0)

## Описание
[**Concierge Service**](https://github.com/Alar-q/Concierge) - это [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 "SPA") с архитектурой и структурой реализованной на стеке MERN.

Документация [backend](https://github.com/Alar-q/Concierge/tree/bizup/server#readme)
и [frontend](https://github.com/Alar-q/Concierge/tree/bizup/client#readme).

В целом, общей темой консьерж-сервиса является предоставление индивидуальной помощи и внимания к потребностям клиента, независимо от отрасли, в которой он предлагается.

Основная идея проекта - Консьерж-сервис — это индивидуальная помощь, оказываемая профессионалом, который стремится удовлетворить потребности и запросы клиента. Эту услугу можно найти в различных отраслях, таких как гостиничный бизнес, здравоохранение, недвижимость и путешествия. Консьерж выступает в качестве посредника между клиентом и услугами или продуктами, которые ему требуются, договариваясь, резервируя и предоставляя рекомендации для обеспечения удовлетворения потребностей клиента. Цель услуги — обеспечить беспрепятственный и беззаботный опыт для клиента, а консьерж выступает в качестве универсального магазина для всех их потребностей.


## Функционал
* Локальная аутентификация
* OAuth (Microsoft Azure)
* Работа с сессиями, сохранение сессий в базе
* Локальное хранение файлов и их защита
* Процесс заказа с помощью multistep form
* Спроектированная база данных
* Защищенный API для взаимодействия клиента с БД
* Динамичное обновление контента на клиенте
* Chat с разными типами сообщений (текст, формы, документы)
* Flight Tracker
* CRM
* Переводчик в чате на разные языки
* Автоматическая генерация документов для бухгалтерии (приложение 50 форма P-1)

## Аутентификация и авторизация
В проекте используется OAuth и локальная аутентификация. Авторизация происходит посредством сессий, 
которые сохраняются в базе данных, благодаря чему при перезагрузке сервера сессии не удаляются. 

Сейчас реализована аутентификация OpenID Connect от [Microsoft Azure](https://www.passportjs.org/packages/passport-azure-ad/) с помощью [Passport.js](https://www.passportjs.org/). 
Логика реализации позволяет добавлять и другие OAuth сервисы.

Если потребуется дополнить проект JWT-токенами нужно будет переделывать как фронт часть, так и бэк часть.

В этом проекте при потребности авторизации по JWT, нужно реализовывать Refresh Token несколько на один аккаунт.
Refresh Token в идеальном случае реализации JWT-авторизации лучше использовать один на аккаунт
клиента, что может быть полезно в приложениях требующих большей безопасности,
но в таком случае при смене на другое устройство каждый раз придется вводить логин и пароль.

Также JWT-авторизация была бы удобна при использовании микросервисной архитектуры, где можно было бы, например, запускать
/auth, /file, /mail сервисы отдельно друг от друга. 
Сейчас мы ограничены монолитной архитектурой.

## Файлы
Файлы хранятся локально в файловой системе сервера.
Требуется доработка в случае, если придется использовать распределенные серверы.

Реализована загрузка файлов кусками(chunk of data) и буферизация на диске, вместо хранение в памяти.
Нельзя хранить файлы в памяти, так как может достаточно быстро произойти переполнение памяти. 

## Multistep Form
Реализована абстракция логики создания последовательных,
множественных форм и сохранения их в контексте.

## База данных
В проекте мы используем документоориентированную базу данных MongoDB и ODM mongoose
для взаимодействия с базой данных. REST API предоставляет CRUD операции для моделей
базы данных с функциями защиты от пользователей, не имеющих доступ к определенной операции.

## Динамическое обновление контента на клиенте
С помощью websocket реализовано динамическое обновление данных на клиентской стороне,
например, браузере, с помощью выполнения функций после изменения документа,
которые, в свою очередь, работают наподобие алгоритма наблюдателя
(все, кто должен получить обновление, получают обновление). 
Например, менеджер загрузил данные цен на отели и при изменении цены на этот отель менеджер сразу же уведомляется об изменении и меняет её.

Если в базе данных хранятся все нужные данные о том, какие пользователи должны
получать обновление, в терминах socket.io, какому сокету скидывать эти обновления?

Каждый раз при подключении пользователя к сайту мы производим авторизацию и добавляем сокет
клиента в комнату user.id. Теперь мы знаем в какую комнату скидывать уведомления изменений.
Даже если пользователь зайдет с нескольких устройств, сокеты соединения с этими устройствами
добавятся в комнату user.id, оба, и оба будут получать изменения.

## Chat
Websocket и динамическое обновление контента позволило реализовать обмен сообщениями
между клиентом и менеджером-Concierge посредством чата.

У сообщения есть типы, что дает масштабируемость возможных типов сообщений.
Уже реализованы текстовые, файловые сообщения и сообщения-формы.

В проекте используются только диалоги, хотя сама логика реализована с учетом групп,
где могут переписываться неограниченное количество человек.

На стороне клиента, мы загружаем всю историю переписки, что в некоторых случаях может быть ненужно.
Требуется оптимизация, которую можно представить ленивой загрузкой или чем-то вроде пагинации.

## CRM
Реализована CRM для админов Concierge и менеджеров. В проекте должна быть реализована удобная CRM система, не только для Concierge, но и для партнеров Concierge.

## Дополнительный функционал
* Flight Tracker - отслеживание авиарейсов и их визуализация на сайте. Данные авиарейсов берутся из открытого API.
* Перевод текста сообщений на разные языки. Используется открытый [API MyMemory](https://mymemory.translated.net/).
* Анализ тональности текста сообщений. Используется открытый [API Ninjas](https://api-ninjas.com/).
* Автоматическая генерация документов для бухгалтерии (приложение 50 форма P-1) последующей реализацией возможности цифровой подписи документов, есть возможность полного избавления от "бумажной волокиты". Используется библиотека [Docx.js](https://docx.js.org/#/)

## Built With

* MongoDB
* Express JS
* React
* Node JS

## Технологии
В процессе разработки front и back два отдельных приложения.  
React будет общаться с API через proxy.

В производственном окружении SPA React собирается в 2 файла(html, js)   
и будет выдаваться сервером.

Инструкции, которые помогут вам запустить
[backend](https://github.com/Alar-q/Concierge/tree/bizup/server#readme)
и [frontend](https://github.com/Alar-q/Concierge/tree/bizup/client#readme)  
проекта на вашем локальном компьютере для целей разработки  
и тестирования
смотреть в соответствующих README.

Здесь перечислены основные фреймворки и библиотеки, используемые в проекте. Полный список используемых технологий для каждой части проекта находится в файлах package.json в папках frontend и backend.

#### Common
1. ES2019
2. [Git](https://git-scm.com/book/ru/v1/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-Git "Git")
3. [REST API](https://www.restapitutorial.com/lessons/restquicktips.html "REST API")
4. [Socket.IO](https://socket.io/docs/ "Socket.IO")
5. [npm](https://en.wikipedia.org/wiki/Npm_(software))
6. [webpack](https://webpack.js.org/)

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

## Authors

* **Alar Akilbekov** (Backend, React) - [Alar-q](https://github.com/alar-q) - [@alar4j](https://t.me/alar4j)
* **Ayan Ualiev** (Backend, Frontend) - [Ualiyevvv](https://github.com/ualiyevvv) - [@mitxp](https://t.me/mitxp)
* **Dinara Dandibayeva** (UI/UX Designer) - [Dina](https://github.com/DanDina777) - [@dandi_w](https://t.me/dandi_w)
* **Ernar Tursinaly** (DevOps) - [Ernar](https://github.com/tshipenchko) - [@merura](https://t.me/merura)

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
[MIT](https://github.com/alar-q/concierge/blob/bizup/LICENSE)




## The problems of working together with the company after the competition

When we wrote the project it was a time when ChatGPT had just come out. I suggested to integrate their API to create a prototype and mvp site to attract venture capital investments.
CEO didn't want that idea and he just wanted a linear site where the client gets a call back like on watsapp, which is what they are doing now, for their task we made an overkill. Although we worked with them for the sake of attracting investment. At the end of the job he was supposed to pay us 5.000.000 tenge (10.000$), but he did not pay us at the end. Time and nerves were wasted, and our studies suffered.  

Perhaps for me and my development team at that time it was too big a scope for me to qualify for venture capital investment. Although also there were useless project managers in the company along with the top executives, but it didn't affect anything. 

9th of June 2023:"
Leaving Concierge Service.  
I spent most of my time planning the database, authentication methods, working with the web socket to work in-real-time, and architecting the project for future scalability and development.
I have decided that I am leaving Concierge. We have been on standby for maybe a month or two for absolutely nothing. There are reasons to stay, but the reasons to leave outweighed as emotionally I felt like I needed to leave them and move on, even though I tried to change the vision of the company to fix things and become a truly venture-backed startup. I didn't feel supported and interested in developing the product with actions rather than words. The online platform was and still is on its own.... just to see if we can make something out of it. All the business logic has to be invented by us, as developers, while competent people do nothing. I don't see any support. Treating us like shit except for the moments we are brought into the company. Lots of promises and empty words, probably lying, manipulation and not dealing with the work. Total IT incompetence and misunderstanding and underestimating what we do.  
As for "just in case", that was the case with the team from Almaty, which was brought in for absolutely nothing. I could not give them a task, as we were inventing and writing the foundation, which is very difficult to delegate. To delegate such tasks you need to be very confident in the person you are delegating to. We needed a full understanding of where we were going so that everyone could see for themselves where they could be useful and do the work. I'm not their mum and I'm not a senior tech lead who would wipe their arse." 
