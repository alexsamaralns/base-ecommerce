const { Router } = require('express');
const HelloController = require('../controllers/HelloController');

const routesHello = new Router();

routesHello.get('/hello', HelloController.index);

module.exports = routesHello;
