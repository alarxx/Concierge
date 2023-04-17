const Router = require('express').Router();

Router.use('/auth', require('./auth/auth-route'));
Router.use('/file', require('./file/file-route'));

// не все апишки требуют аутентификации
Router.use('/api', require('./api/api-route'));

Router.use(require('../middlewares/checkAuthenticated'));

Router.get('/protected', (req, res)=>{
    res.json({ secret: "secret", user: req.user });
});


module.exports = Router;