const express = require('express');
// const { celebrate, Segments, Joi } = require('celebrate');

const HomeController = require('./controllers/HomeController');
const StartController = require('./controllers/StartController');
const StatusController = require('./controllers/StatusController');
const SendTextController = require('./controllers/SendTextController');
const PingController = require('./controllers/PingController');
const SendFileController = require('./controllers/SendFileController');
const QrCodeController = require('./controllers/QrCodeController');
const CloseController = require('./controllers/CloseController');
const GroupsController = require('./controllers/GroupsController');
const FraseAleatoriaController = require('./controllers/FraseAleatoriaController');
const CheckPhoneController = require('./controllers/CheckPhoneController');

const routes = express.Router();

routes.get('/', HomeController.index);
routes.get('/start', StartController.create);
routes.get('/status', StatusController.create);
routes.get('/qrcode', QrCodeController.create);
routes.get('/ping', SendTextController.create);
routes.post('/sendText', SendTextController.create);
routes.post('/sendFile', SendFileController.create);
routes.get('/close', CloseController.create);
routes.get('/groups', GroupsController.index);
routes.get('/frases', FraseAleatoriaController.index);
routes.get('/checkPhone', CheckPhoneController.index);

// Test validations

// routes.get('/start', [Segments.QUERY]: {
//   sessionName: Joi.string().token().required()
// }, StartController.create);


// routes.post('/sendText', celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       sessionName: Joi.string().required(),
//       number: Joi.string().required(),
//       text: Joi.string().required(),
//     })
// }), SendTextController.create);

module.exports = routes;