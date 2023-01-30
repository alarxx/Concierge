const express = require('express');

const trimStrings = require('../../../common/trimStrings');

const Router = express.Router();

Router.get('/', (req, res)=>{
	// console.log(req.user);
	if(req.isAuthenticated()) {
		return res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			entity: req.user.entity,
			role: req.user.role,
		});
	}
	return res.status(401).json({message: 'Unauthorized'});
});

Router.use('/logout', require('./logout/logout'));

Router.use((req, res, next)=>{
	req.body = trimStrings(req.body);
	next();
})

Router.use('/login', require('./login/login'));
Router.use('/register', require('./register/register'));

module.exports = Router;
