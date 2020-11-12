const SessionService = require("../services/SessionService");

module.exports = {
    async create(request, response, next) {
        console.log("starting info session..." + request.query.sessionName);
        let session = await SessionService.getSession(request.query.sessionName);
    
        if (session != false) {
            WebhookService.notifySessionState(session);
            response.status(200).json({ status: session.status, state: session.state });  
        } else {
            response.status(200).json({ result: "error", message: "NOTFOUND" });
        }
    }
};