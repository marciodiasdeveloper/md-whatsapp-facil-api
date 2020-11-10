const express = require('express');

const routes = express.Router();

const StartController = require('./controllers/StartController');
const StatusController = require('./controllers/StatusController');

routes.get('/start', StartController.create);
routes.get('/status', StatusController.create);

module.exports = routes;