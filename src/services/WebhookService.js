const axios = require('axios');

// require('dotenv').config();
require('dotenv/config');

module.exports = class Sessions {

    static async notifyApiSessionUpdate(session) {

        console.log('WebHookService notifySessionState:', session);
        console.log('process.env.API_WEBHOOK_URL', process.env.API_WEBHOOK_URL);

        const response = await axios.post(process.env.API_WEBHOOK_URL+'/session/status', session)  
        .then(function(response){
            console.log('salvo com sucesso', response);
        });
        return response;
    }

}