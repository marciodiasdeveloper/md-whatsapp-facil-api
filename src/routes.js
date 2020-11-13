const express = require('express');

const routes = express.Router();

const HomeController = require('./controllers/HomeController');
const StartController = require('./controllers/StartController');
const StatusController = require('./controllers/StatusController');
const SendTextController = require('./controllers/SendTextController');
const SendFileController = require('./controllers/SendFileController');
const QrCodeController = require('./controllers/QrCodeController');
const CloseController = require('./controllers/CloseController');
const GroupsController = require('./controllers/GroupsController');
const FraseAleatoriaController = require('./controllers/FraseAleatoriaController');

routes.get('/', HomeController.index);
routes.get('/start', StartController.create);
routes.get('/status', StatusController.create);
routes.get('/qrcode', QrCodeController.create);
routes.post('/sendText', SendTextController.create);
routes.post('/sendFile', SendFileController.create);
routes.get('/close', CloseController.create);
routes.get('/sendTest', SendTextController.test);
routes.get('/groups', GroupsController.index);
routes.get('/frases', FraseAleatoriaController.index);

module.exports = routes;