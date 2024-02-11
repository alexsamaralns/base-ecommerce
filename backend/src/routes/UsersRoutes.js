const { Router } = require('express');
const auth = require('../middlewares/Auth');
const UsersController = require('../controllers/UsersController');
const SessionsController = require('../controllers/SessionsController');

const routesUsers = new Router();
routesUsers.post('/sessions', SessionsController.create);

routesUsers.use(auth);
routesUsers.post('/toggleTheme', UsersController.toggleTheme);
routesUsers.get('/users', UsersController.showAllUsers);
routesUsers.get('/user/:id', UsersController.showUserById);
routesUsers.post('/createUser', UsersController.createUser);
routesUsers.put('/updateUser', UsersController.updateUser);
routesUsers.delete('/deleteUser/:id', UsersController.deleteUser);

module.exports = routesUsers;
