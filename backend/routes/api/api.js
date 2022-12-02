const express = require('express');
const Router = express.Router();

Router.use(require(require.main.path + '/auth/checkAuthenticated'));

Router.get('/', (req, res)=>{
	res.send({page: 'api', routes: ['post']});
});

Router.use('/post', require('./post/post'));

module.exports = Router;
