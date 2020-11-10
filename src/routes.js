const express = require('express');

const routes = express.Router();

const SessionStartController = require('./controllers/SessionStartController');

routes.get('/start', SessionStartController.create);

module.exports = routes;