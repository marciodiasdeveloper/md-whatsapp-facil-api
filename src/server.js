const app = require('./app');

require('dotenv').config();

app.listen(process.env.HOST_PORT);