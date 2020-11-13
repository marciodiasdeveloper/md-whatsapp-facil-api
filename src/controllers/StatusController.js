const SessionService = require("../services/SessionService");
const WebhookService = require("../services/WebhookService");

module.exports = {
    async create(request, response, next) {
        console.log("starting info session..." + request.query.sessionName);
        let session = await SessionService.getSession(request.query.sessionName);
    
        if (session != false) {


         let client_host = await session.client.then(async client => {
                        console.log('client.getHostDevice() ->', client.getHostDevice()); 
                        let phone_number = await client.getHostDevice().then(pn => {
                            console.log('pn', pn);
                        });
                    });

                    console.log('client_host', client_host);

            WebhookService.notifyApiSessionUpdate(session);
            response.status(200).json({ name: session.name, status: session.status, state: session.state });  
        } else {
            response.status(200).json({ result: "error", message: "NOTFOUND" });
        }
    }
};