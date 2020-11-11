const SessionService = require("../service/SessionService");
// const WebhookService = require("../service/WebhookService");


module.exports = {
    async create(request, response, next) {
        console.log("starting session:" + request.query.sessionName);
        
        let session = await SessionService.start(request.query.sessionName);
    
        console.log('CHECK: -> StartController create session:', session);
        WebhookService.notifySessionState(session);

        if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
            response.status(200).json({ result: 'success', message: session.state });
        } else {
            response.status(200).json({ result: 'error', message: session.state });
        }
    }
};