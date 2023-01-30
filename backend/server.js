// const dotenv = require('dotenv').config()
const {credentials} = require(`./config`);

const colors = require('./logging/colors');

const mongoose = require('mongoose');
const path = require('path');

// credentials.dbUri = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(credentials.dbUri, {useNewUrlParser: true})
	.then(() => {
		console.log(colors.green(`MongoDB connected`), colors.gray(`${credentials.dbUri}`));
	})
	.catch(err => {
		console.log(colors.yellow('Failed to connect to MongoDB'), err);
	});

require('./models/modelsManager').initialize();

const express = require('express');

const app = express();

const http = require('http');
const server = http.createServer(app);

/** Доступ к статическим файлам */
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.resolve(__dirname, '../build-frontend')));

/** Body Parser */
const bodyParser = require('body-parser');
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** File Upload */
const fileUpload = require('express-fileupload');
app.use(fileUpload());

/** Большая логика с Express-Session */
const session = require('express-session');

/* Сохраняем сессии в базе данных, для их сохранения после перезагрузки сервера */
const MongoDBSession = require('connect-mongodb-session')(session);
const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
const sessionStore = new MongoDBSession({
  	uri:  credentials.dbUri,
  	collection: 'sessions',
	expires: expiresIn,
});
sessionStore.on('error', function(error) {
  console.log(error);
});

const sessionMiddleware = session({
	secret: credentials.cookieSecret,
	cookie: {
		maxAge: expiresIn,
	},
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
});

app.use(sessionMiddleware);

/** Passport JS */
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('./auth/passport');
LocalStrategy();


/** WebSocket */
require('./websocket/socket.io').initialize({
	server: server,
	sessionMiddleware: sessionMiddleware,
	env: app.get('env'),
});


/** Logging with Morgan JS */
const morgan = require('morgan');
const fs = require('fs');
const stream = fs.createWriteStream(
	__dirname + '/logging/access.log',
	{flags: 'a'}
)
app.use(morgan('combined', { stream }))


if(process.env.NODE_ENV !== 'production') {
	/** Используем CORS в окружении разработки */
	app.use(require('cors')({
		origin: ['http://localhost:9000']
	}));

	/** Используем логирование в окружении разработки */
	const object2string = require('./logging/object2string')
	app.use((req, res, next) => {
		const request = {
			user: req.user?.email,
			url: req.url,
			method: req.method,
			headers: {'Content-Type': req.headers['content-type']},
		}
		if (request.method === 'GET')
			request.query = req.query;
		else
			request.body = req.body;
		console.log(colors.bright_cyan('REQUEST'), object2string(request));
		next()
	});
}

/** All Routes */
app.use('/', require('./routes/root'));


const port = process.env.PORT || 3000;
server.listen(port, ()=>{
	console.log(`server is listening on port ${port}`)
});

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀

██████╗ ███████╗███╗   ██╗ █████╗ ██╗███████╗███████╗ █████╗ ███╗   ██╗ ██████╗███████╗
██╔══██╗██╔════╝████╗  ██║██╔══██╗██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝██╔════╝
██████╔╝█████╗  ██╔██╗ ██║███████║██║███████╗███████╗███████║██╔██╗ ██║██║     █████╗
██╔══██╗██╔══╝  ██║╚██╗██║██╔══██║██║╚════██║╚════██║██╔══██║██║╚██╗██║██║     ██╔══╝
██║  ██║███████╗██║ ╚████║██║  ██║██║███████║███████║██║  ██║██║ ╚████║╚██████╗███████╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝

8888888b.                            d8b
888   Y88b                           Y8P
888    888
888   d88P .d88b.  88888b.   8888b.  888 .d8888b  .d8888b   8888b.  88888b.   .d8888b .d88b.
8888888P" d8P  Y8b 888 "88b     "88b 888 88K      88K          "88b 888 "88b d88P"   d8P  Y8b
888 T88b  88888888 888  888 .d888888 888 "Y8888b. "Y8888b. .d888888 888  888 888     88888888
888  T88b Y8b.     888  888 888  888 888      X88      X88 888  888 888  888 Y88b.   Y8b.
888   T88b "Y8888  888  888 "Y888888 888  88888P'  88888P' "Y888888 888  888  "Y8888P "Y8888


 ██▀███  ▓█████  ███▄    █  ▄▄▄       ██▓  ██████   ██████  ▄▄▄       ███▄    █  ▄████▄  ▓█████
▓██ ▒ ██▒▓█   ▀  ██ ▀█   █ ▒████▄    ▓██▒▒██    ▒ ▒██    ▒ ▒████▄     ██ ▀█   █ ▒██▀ ▀█  ▓█   ▀
▓██ ░▄█ ▒▒███   ▓██  ▀█ ██▒▒██  ▀█▄  ▒██▒░ ▓██▄   ░ ▓██▄   ▒██  ▀█▄  ▓██  ▀█ ██▒▒▓█    ▄ ▒███
▒██▀▀█▄  ▒▓█  ▄ ▓██▒  ▐▌██▒░██▄▄▄▄██ ░██░  ▒   ██▒  ▒   ██▒░██▄▄▄▄██ ▓██▒  ▐▌██▒▒▓▓▄ ▄██▒▒▓█  ▄
░██▓ ▒██▒░▒████▒▒██░   ▓██░ ▓█   ▓██▒░██░▒██████▒▒▒██████▒▒ ▓█   ▓██▒▒██░   ▓██░▒ ▓███▀ ░░▒████▒
░ ▒▓ ░▒▓░░░ ▒░ ░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░▓  ▒ ▒▓▒ ▒ ░▒ ▒▓▒ ▒ ░ ▒▒   ▓▒█░░ ▒░   ▒ ▒ ░ ░▒ ▒  ░░░ ▒░ ░
  ░▒ ░ ▒░ ░ ░  ░░ ░░   ░ ▒░  ▒   ▒▒ ░ ▒ ░░ ░▒  ░ ░░ ░▒  ░ ░  ▒   ▒▒ ░░ ░░   ░ ▒░  ░  ▒    ░ ░  ░
  ░░   ░    ░      ░   ░ ░   ░   ▒    ▒ ░░  ░  ░  ░  ░  ░    ░   ▒      ░   ░ ░ ░           ░
   ░        ░  ░         ░       ░  ░ ░        ░        ░        ░  ░         ░ ░ ░         ░  ░

*/