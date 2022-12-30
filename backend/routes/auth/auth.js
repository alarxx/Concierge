const express = require('express');
const Router = express.Router();

Router.get('/', (req, res)=>{
	if(req.isAuthenticated())
		return res.json(req.user);
	res.status(401).json({message: 'Unauthorized'});
});

Router.use('/logout', require('./logout/logout'));

Router.use('/login', require('./login/login'));
Router.use('/register', require('./register/register'));

module.exports = Router;
