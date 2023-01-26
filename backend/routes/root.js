const express = require('express');
const path = require('path');

const Router = express.Router();

Router.use('/auth', require('./auth/auth'));
Router.use('/api', require('./api/api'));
Router.use('/file', require('./file/file'));

/*if(Router.get('env') === 'production') { // В development мы используем proxy
	Router.use((req, res) => {
		res.sendFile(require('path').resolve(__dirname, 'view/index.html'));
	});
} else {
	Router.use((req, res) => {
		res.json({message: 'No such route'});
	});
}*/

Router.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../build-client/index.html'));
});

Router.use((err, req, res, next)=>{
	res.json({message: err});
});

module.exports = Router;