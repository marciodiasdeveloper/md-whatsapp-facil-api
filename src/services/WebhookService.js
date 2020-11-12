const axios = require('axios');

require('dotenv/config');

module.exports = class Sessions {

    static async notifyApiSessionUpdate(session) {
        const response = await axios.post(process.env.API_WEBHOOK_URL+'/session/status', session)  
        .then(function(response){
            console.log('Webhook enviado com sucesso!');
        }).catch(e => console.log(e));
        
        return response;
    }

}