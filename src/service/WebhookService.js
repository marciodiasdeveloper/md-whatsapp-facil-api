const request = require('request');

require('dotenv').config();

module.exports = class Sessions {

    static async notifySessionState(session) {
        const options = {
            url: process.env.API_WEBHOOK_URL+'/session/status/'+session,
            json: true,
            body: session
        };
        
        let result = await request.post(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(body);
        });
        return result;
    }

}