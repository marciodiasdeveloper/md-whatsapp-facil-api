const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const HomeController = require('./controllers/HomeController');
const StartController = require('./controllers/StartController');
const StatusController = require('./controllers/StatusController');
const SendTextController = require('./controllers/SendTextController');
const SendFileController = require('./controllers/SendFileController');
const QrCodeController = require('./controllers/QrCodeController');
const CloseController = require('./controllers/CloseController');
const GroupsController = require('./controllers/GroupsController');
const CheckPhoneController = require('./controllers/CheckPhoneController');
const DeviceController = require('./controllers/DeviceController');

const BomDiaController = require('./controllers/BomDiaController');
const QuatroI20Controller = require('./controllers/QuatroI20Controller');

const routes = express.Router();

routes.get('/', HomeController.index);
routes.get('/start', StartController.create);
routes.get('/status', StatusController.create);
routes.get('/device', DeviceController.index);
routes.get('/qrcode', QrCodeController.create);
routes.post('/sendText', SendTextController.create);
routes.post('/sendFile', SendFileController.create);
routes.get('/close', CloseController.create);
routes.get('/groups', GroupsController.index);
routes.get('/checkPhone', CheckPhoneController.index);

routes.get('/bomdia', BomDiaController.index);
routes.get('/4i20', QuatroI20Controller.index);

// Test validations

// routes.get('/status', celebrate({
//   [Segments.QUERY]: {
//       sessionName: Joi.string().required()
//     }
// }), StatusController.create);

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