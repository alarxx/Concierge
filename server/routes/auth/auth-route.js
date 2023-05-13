const Router = require('express').Router();

const authController = require('../../controllers/auth/auth-controller');

Router.get('/logout', authController.logout);
Router.post('/logout', authController.logout);
Router.delete('/logout', authController.logout);

Router.get('/failure', authController.failureRedirect);
Router.get('/success', authController.successAuthentication);

// OIDC Authentication
Router.use('/azure', require('./azure/azure-route'));
Router.use('/local', require('./local/local-route'));
Router.use('/password', require('./password/password-route'));

Router.use(require('../../middlewares/checkAuthenticated'));

Router.get('/whoami', authController.whoami);
Router.patch('/name', authController.setName);

module.exports = Router;