const {credentials} = require(`./config`);

const mongoose = require('mongoose');
mongoose.connect(credentials.dbUri, {useNewUrlParser: true});

const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

if(app.get('env') === 'development')
	app.use(require('cors')());

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const session = require('express-session');

const MongoDBStore = require('express-mongodb-session')(session);
const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
const sessionStore = new MongoDBStore({
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

const io = require('./socket.io')(server, sessionMiddleware, app.get('env'));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('./auth/passport');
LocalStrategy();

app.use('/', require('./routes/root'));

const port = process.env.PORT || 3000;
server.listen(port, ()=>console.log(`server is listening on port ${port}`));