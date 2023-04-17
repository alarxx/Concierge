require('dotenv').config();

const fs = require('fs');
const path = require('path');

const logger = require('./log/logger')('server');

const express = require('express');
const mongoose = require('mongoose');

/** Initialize MongoDB models */
// require('./models/models-manager').initialize();

const app = express();

const http = require('http');
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, '../build-client')));

/** JSON Parsing */
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

/** File Upload multipart/form-data */
const MulterManager = require("./fileupload/MulterManager");
const multerManager = new MulterManager();
multerManager.startClearInterval();
app.use(multerManager.middleware());

/** Session */
const session = require('express-session');

/* Session-Store */
const MongoDBSession = require('connect-mongodb-session')(session);
const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days
const sessionStore = new MongoDBSession({
	uri:  process.env.MONGODB_URI,
	collection: 'sessions',
	expires: expiresIn,
});
sessionStore.on('error', function(error) {
	logger.log(error);
});

/* Session-Middleware */
const sessionMiddleware = session({
	secret: process.env.COOKIE_SECRET,
	cookie: {
		maxAge: expiresIn,
	},
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
});

app.use(sessionMiddleware);

/** Initialize PassportJS */
const passport = require('passport');
require('./auth/passport-config')();
app.use(passport.initialize());
app.use(passport.session());

/** WebSocket */
require('./websocket/socket-io').initialize({
	server: server,
	sessionMiddleware: sessionMiddleware,
});

/** Logging with Morgan JS */
const morgan = require('morgan');
const {File} = require("./models/models-manager");
const stream = fs.createWriteStream(
	path.join(__dirname, '/log/access.log'),
	{flags: 'a'}
);
app.use(morgan('combined', { stream }));

/** What to do only in a development environment */
if(process.env.NODE_ENV === 'development') {
	logger.log("cors 9000")
	/*Используем CORS в окружении разработки */
	app.use(require('cors')({
		origin: ['*']
	}));

	/* Используем логирование в консоль в окружении разработки */
	app.use(require('./middlewares/dev-log-middleware'));
}

/** All Routes */
app.use(require('./routes/index'))

/** Error handling */
app.use(require('./middlewares/error-middleware'));

(async ()=>{
	const { PORT, MONGODB_URI } = process.env;

	await mongoose.connect(MONGODB_URI, {
		useNewUrlParser: true
	}).then(() => {
		logger.log(`MongoDB connected`, `${MONGODB_URI}`);
	}).catch(err => {
		logger.log('Failed to connect to MongoDB', err);
	});

	server.listen(PORT, ()=>{
		logger.log(`server is listening on port ${PORT}`);
	});
})()
