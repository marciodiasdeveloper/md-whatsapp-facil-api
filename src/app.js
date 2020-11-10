const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

require('dotenv').config();


if (process.env.HTTPS == 1) {

    const serverInfo = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    };

    https.createServer(serverInfo, app).listen(process.env.HOST_PORT);
    console.log("Https server running on port " + process.env.HOST_PORT);

} else { 
    
    app.listen(process.env.HOST_PORT, () => {
        console.log("Http server running on port " + process.env.HOST_PORT);
    });

}//http

module.exports = app;