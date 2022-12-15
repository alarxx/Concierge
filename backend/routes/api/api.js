const express = require('express');
const Router = express.Router();

Router.use(require.main.require('./auth/checkAuthenticated'));

Router.get('/', (req, res)=>{
	res.send({page: 'api', routes: ['post']});
});

// Router.use('/post', require('./post/post'));
Router.use('/order', require('./order/order'));

module.exports = Router;
