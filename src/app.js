const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// const fs = require('fs');
// const https = require('https');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// require('dotenv').config();

module.exports = app;