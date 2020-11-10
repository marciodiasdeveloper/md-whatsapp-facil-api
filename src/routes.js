const express = require('express');

const routes = express.Router();

const StartController = require('./controllers/StartController');
const StatusController = require('./controllers/StatusController');
const SendTextController = require('./controllers/StatusController');
const SendFileController = require('./controllers/StatusController');
const QrCodeController = require('./controllers/StatusController');
const CloseController = require('./controllers/StatusController');

routes.get('/start', StartController.create);
routes.get('/status', StatusController.create);
routes.get('/qrcode', QrCodeController.create);
routes.post('/sendText', SendTextController.create);
routes.post('/sendFile', SendFileController.create);
routes.get('/close', CloseController.create);

module.exports = routes;