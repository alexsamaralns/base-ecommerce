const express = require('express');
const { Router } = express;
const cors = require('cors');

const HelloRoutes = require('./routes/HelloRoutes');
const UsersRoutes = require('./routes/UsersRoutes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(HelloRoutes);
    this.server.use(UsersRoutes);
  }
}

module.exports = new App().server;
